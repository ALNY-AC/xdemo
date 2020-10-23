export default class Node {
    id = '';
    name = 'node';
    $el = "";
    dragNode = null;
    comp = '';
    properties = {};

    init() { }
    update() { }
    destroyed() { }

    // 拖拽节点事件
    onResizeCallback() { }

}