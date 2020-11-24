
let html = '';
let max = 0;
let count = 0

function GetNodeHtml(index, strParent, node, level) {
    if (node) {

        if (node.child.length > 0) {

            node.child.forEach((el, j) => {
                count = 0;
                GetSubCounts(node);
                if (count > 0) {
                    if (j == 0) {
                        strParent = strParent + "<td rowspan=" + count + ">" + node.label + "</td>"
                    } else {
                        strParent = "<tr>";
                    }
                } else {

                }
                //继续下一级
                GetNodeHtml(j, strParent, el, level + 1);
            });

        }
        else {
            //没有下级 结束
            strParent = strParent + "<td>" + node.label + "</td>"
            var tmp = ""
            for (var i = 0; i < (max - level) * 2; i++) {
                tmp = tmp + "<td></td>";
            }
            html = html + strParent + tmp + "</tr>";
        }
    }
}

function GetSubCounts(node) {
    if (node.child.length > 0) {

        for (var i = 0; i < node.child.length; i++) {
            GetSubCounts(node.child[i])
        }
    } else {
        count++;
    }
}

html = "<tr>";

function to(arr = []) {
    html = '';
    count = 0;
    max = 0;
    for (var i = 0; i < arr.length; i++) {
        GetNodeHtml(i, "<tr>", arr[i], 1);
    }
    return html;
}

export default to