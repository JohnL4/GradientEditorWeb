var GradientPoint = (function () {
    function GradientPoint(aPosition, aColor) {
        if (aPosition < 0.0 || aPosition > 1.0)
            throw new Error("Position not in range [0.0, 1.0]: " + aPosition);
        if (!/^#[0-9a-f]{6,6}$/.test(aColor))
            throw new Error("Color not in form '#xxxxxx': " + aColor);
        this.position = aPosition;
        this.color = aColor;
    }
    return GradientPoint;
})();
var gradientPoints = [
    new GradientPoint(0.0, "#660099"),
    new GradientPoint(0.25, "#3366ff"),
    new GradientPoint(0.5, "#cceeff"),
    new GradientPoint(0.501, "#ffffcc"),
    new GradientPoint(0.675, "#00ff00"),
    new GradientPoint(0.875, "#996633"),
    new GradientPoint(1.0, "#ffffff")
];
function loaded() {
    clearTableRows("gradientPointsTable");
    addTableRows("gradientPointsTable", gradientPoints);
}
function clearTableRows(aTableId) {
    var tbl;
    tbl = document.querySelector("#" + aTableId);
    for (var i = 0; i < tbl.children.length; i++) {
        if (tbl.children[i].nodeType == Node.ELEMENT_NODE) {
            var tbody = tbl.children[i];
            if (tbody.rows) {
                while (tbody.rows.length > 1)
                    tbody.deleteRow(1);
            }
            break;
        }
    }
}
function addTableRows(aTableId, aGradientPoints) {
    var tbl;
    tbl = document.querySelector("#" + aTableId);
    for (var i = 0; i < tbl.children.length; i++) {
        if (tbl.children[i].nodeType == Node.ELEMENT_NODE) {
            var tbody = tbl.children[i];
            if (tbody.rows) {
                for (var j = 0; j < aGradientPoints.length; j++) {
                    insertNewRow(tbody, aGradientPoints[j]);
                }
                insertLastEmptyRow(tbody);
            }
        }
    }
}
function insertNewRow(aTBody, aGradientPoint) {
    var tr = aTBody.insertRow();
    var td;
    td = tr.insertCell();
    var button = document.createElement("BUTTON");
    button.textContent = "+";
    td.appendChild(button);
    td = tr.insertCell();
    button = document.createElement("BUTTON");
    button.textContent = "-";
    td.appendChild(button);
    td = tr.insertCell();
    td.textContent = aGradientPoint.position.toString();
    td = tr.insertCell();
    td.textContent = aGradientPoint.color;
}
function insertLastEmptyRow(aTBody) {
    var tr = aTBody.insertRow();
    var td;
    td = tr.insertCell();
    var button = document.createElement("BUTTON");
    button.textContent = "+";
    td.appendChild(button);
}
