/**
 * 试卷的配置项
 */
export default {
    getConfig() {
        return {
            name: '试卷名',
            subjects: [

            ]
        }
    },
    /**
     * 获得题目配置项
     * 
     * 单选 radio
     * 多选 checkbox
     * 表格 table
     * 填空 fill
     * 文本域 textarea
     * 文本框 input
     * 
     */
    getSubject(type) {
        return this['get_' + type]();
    },

    /**
     * 获得选项
     */
    getOption() {
        return [
            // 标签、key值、选项值,key和value2选1
            this.getOptionItem()
            // { label: '', key: '', value: '' },
        ];
    },
    /**
  * 获得单个选项
  */
    getOptionItem(label = '选项') {
        return { label: label, key: '', value: '', required: false, score: 0, }
    },

    /**
     * 获得题目的默认配置
     */
    getBaseData(type, title = '') {
        return {
            type: type,
            // 字段题目对标题
            title: title,
            // 字段名
            findName: '',
            // 字段备注
            findRemarks: '',
            // 是否可以填写其他
            isOther: false,
            // 其他是否必填
            requiredOther: false,
            otherScore: 0,
            // 此题目是否必填
            required: false,
            // 此题目的总分值
            score: 0,
        }
    },
    get_radio() {
        return {
            // 基本配置
            ...this.getBaseData('radio', '单选框'),
            // 选项
            options: this.getOption(),
        };
    },
    get_checkbox() {
        return {
            // 基本配置
            ...this.getBaseData('checkbox', '复选框'),
            // 选项
            options: this.getOption(),
        };
    },
    get_table() {
        return {
            // 基本配置
            ...this.getBaseData('table', '表格项'),
            // 选项
            options: this.getOption(),
        };
    },
    get_fill() {
        return {
            // 基本配置
            ...this.getBaseData('fill', '填空'),
            // 选项
            options: this.getOption(),
            // 要填空的文本
            fillText: '填空'
        };
    },
    get_textarea() {
        return {
            // 基本配置
            ...this.getBaseData('textarea', '文本域'),
            // 选项
            options: this.getOption(),
        };
    },
    get_input() {
        return {
            // 基本配置
            ...this.getBaseData('input', '文本框'),
            // 选项
            options: this.getOption(),
        };
    },
}