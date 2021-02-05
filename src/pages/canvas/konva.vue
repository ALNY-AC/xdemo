
<template>
    <div>
        <div id="container"></div>
    </div>
</template>
<script>
import konva from "konva";

export default {
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            //首先，我们需要创建一个舞台
            let stage = new Konva.Stage({
                container: "container",
                width: 500,
                height: 500,
            });
            stage.draggable("true");
            let layer = new Konva.Layer();

            let circle = new Konva.Circle({
                x: 100,
                y: 100,
                radius: 14,
                fill: "red",
                stroke: "black",
                strokeWidth: 1,
            });

            // add the shape to the layer
            layer.add(circle);

            // add the layer to the stage
            stage.add(layer);

            // draw the image
            layer.draw();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
