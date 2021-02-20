<template>
    <div id="gameLife">
        <canvas
            ref="canvas"
            :width="w*devicePixelRatio"
            :height="h*devicePixelRatio"
            :style="{width:(w)+'px',height:(h)+'px'}"
            id="gameLifeCanvas"
        ></canvas>
        <div>
            <el-button @click="refresh">重新</el-button>
            <!-- isEvolution -->
            <h3>{{isEvolution?'演变中':'已停止'}}</h3>
            <el-checkbox v-model="isEvolution">{{isEvolution}}</el-checkbox>
            <pre>{{mouse}}</pre>
            <pre>{{isCanv}}</pre>
            <pre>{{mouse.x/gw}},{{mouse.y/gw}}</pre>
        </div>
    </div>
</template>
<script>
/**
 * 将数字取整为10的倍数
 * @param {Number} num 需要取整的值
 * @param {Number} prec 需要用0占位的数量
 * @param {Boolean} ceil 是否向上取整
 */
const formatInt = (num, prec = 1, ceil = true) => {
    const len = String(num).length;
    if (len <= prec) { return num };

    const mult = Math.pow(10, prec);
    return ceil ?
        Math.ceil(num / mult) * mult :
        Math.floor(num / mult) * mult;
}

export default {
    layout: "root",
    data() {
        return {
            ctx: null,
            w: 800,
            h: 800,
            gw: 10,
            map: [],
            interval: null,
            isEvolution: true,
            devicePixelRatio: 1,// window.devicePixelRatio,
            isCanv: false,
            mouse: {
                x: -1,
                y: -1,
            }
        }
    },
    beforeDestroy() {
        this.stop();
    },
    mounted() {
        this.init();
    },
    methods: {
        refresh() {
            this.initMap();
        },
        async init() {
            await this.$nextTick();
            this.initCanvas();
            this.initMap();
            this.initThread();
        },
        start() {
            let ctx = this.ctx;
            this.initCanvas();
            this.renderLife();
            this.initEvent();
            this.interval = setInterval(() => {
                this.initCanvas();
                this.renderLife();
                if (this.isEvolution) {
                    this.evolution();
                }
            }, 1);
        },
        initEvent() {
            let canvas = this.canvas;
            let ctx = this.ctx;
            canvas.addEventListener('mousemove', (e) => {
                let x = e.layerX * this.devicePixelRatio;
                let y = e.layerY * this.devicePixelRatio;
                x = x - (x % this.gw);
                y = y - (y % this.gw);
                this.mouse.x = x;
                this.mouse.y = y;
                this.map[y / this.gw][x / this.gw] = 1;
                if (this.isCanv) {
                }
            });
            window.addEventListener('keydown', (e) => {
                this.isCanv = true;
            })
            window.addEventListener('keydown', (e) => {
                this.isCanv = false;
            })
        },
        stop() {
            clearInterval(this.interval);
        },
        renderLife() {
            let ctx = this.ctx;
            let gw = this.gw;
            let map = this.map;
            ctx.fillStyle = "rgb(255,255,255)";
            map.forEach((row, i) => {
                row.forEach((col, j) => {
                    if (col == 1) {
                        ctx.fillRect(j * gw, i * gw, gw, gw);
                    }
                });
            });
        },
        evolution() {
            let gw = this.gw;
            let map = this.map;
            let to1s = [];
            let to0s = [];
            map.forEach((row, y) => {
                row.forEach((col, x) => {
                    let count = this.getCount(map, y, x);

                    if (col == 1) {
                        // 存活状态
                        if (count < 2) {
                            // map[y][x] = 0;
                            to0s.push([[x], [y]]);
                        }

                        if (count > 3) {
                            // map[y][x] = 0;
                            to0s.push([[x], [y]]);
                        }
                    }
                    if (col == 0) {
                        // 死亡状态
                        if (count == 3) {
                            // map[y][x] = 1;
                            to1s.push([[x], [y]]);
                        }
                    }

                });
            });

            to1s.forEach(el => {
                map[el[1]][el[0]] = 1;
            })

            to0s.forEach(el => {
                map[el[1]][el[0]] = 0;
            })
            this.map = map;

        },
        /**
         * 计算周围的存活细胞数量
         */
        getCount(map, y, x) {
            let positions = [];
            //第一排
            positions.push([x - 1, y - 1]);//左上角
            positions.push([x, y - 1]);//上方
            positions.push([x + 1, y - 1]);//右上角
            //第二排
            positions.push([x - 1, y]);//左边
            positions.push([x + 1, y]);//右边
            // 第三排
            positions.push([x - 1, y + 1]);//左下角
            positions.push([x, y + 1]);//下方
            positions.push([x + 1, y + 1]);//右下角
            let counts = positions.map(el => {

                if (el[1] < 0 || el[0] < 0) {
                    return 0;
                }
                if (el[1] > this.w / this.gw || el[0] > this.h / this.gw) {
                    return 0;
                }

                let item = map[el[1]][el[0]]
                return item

            }).reduce((t, a) => t + a);

            return counts;


        },
        initThread() {
            this.start();
        },
        initMap() {
            let gw = this.gw;
            let map = [];
            let zz = [
                '10-5', '10-6', '10-7',
                '11-4', '11-8',
                '12-3', '12-9',
                '13-3', '13-9',
                '14-4', '14-8',
                '15-5', '15-6', '15-7',
                '',
                '30-30', '30-30',
                '31-31', '30-31',
                '32-32', '30-32',
                '33-33', '30-33',
            ];

            for (let i = 0; i <= this.h / gw; i++) {
                let row = [];
                for (let j = 0; j <= this.w / gw; j++) {
                    if (zz.indexOf(`${i}-${j}`) >= 0) {
                        row.push(1);
                    } else {
                        row.push(0);
                    }
                }
                map.push(row);
            }
            this.map = map;
        },
        initCanvas() {
            let canvas = this.canvas;
            this.ctx = canvas.getContext('2d');
            let ctx = this.ctx;
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.clearRect(0, 0, this.w, this.h);
            ctx.fillRect(0, 0, this.w, this.h);
            ctx.beginPath();
            this.initGz(ctx);

            ctx.fillStyle = "rgb(255,0,0)";
            ctx.fillRect(this.mouse.x, this.mouse.y, this.gw, this.gw);

        },
        initGz(ctx) {
            let gw = this.gw;
            ctx.strokeStyle = "rgb(255,255,255)";
            for (let i = 0; i <= this.w / gw; i++) {
                ctx.moveTo(i * gw, 0);
                ctx.lineTo(i * gw, this.h);
            }

            for (let i = 0; i <= this.h / gw; i++) {
                ctx.moveTo(0, i * gw);
                ctx.lineTo(this.h, i * gw);
            }
            ctx.stroke();
            ctx.beginPath();
        }
    },
    computed: {
        canvas() {
            return this.$refs['canvas'];
        },
    }

}
</script>
<style lang="scss" scoped>
#gameLife {
    #gameLifeCanvas {
    }
}
</style>