class GradientPoint
{
    position: number;
    color: string;
    constructor( aPosition: number, aColor: string)
    {
        if (aPosition < 0.0 || aPosition > 1.0)
            throw new Error("Position not in range [0.0, 1.0]: " + aPosition);
        if (! /^#[0-9a-f]{6,6}$/.test( aColor))
            throw new Error("Color not in form '#xxxxxx': " + aColor);
        this.position = aPosition;
        this.color = aColor;
    }
}

var gradientPoints: GradientPoint[] =
[
    new GradientPoint( 0.0, "#660099"),
    new GradientPoint( 0.25, "#3366ff"),
    new GradientPoint( 0.5, "#cceeff"),
    new GradientPoint( 0.501, "#ffffcc"),
    new GradientPoint( 0.675, "#00ff00"),
    new GradientPoint( 0.875, "#996633"),
    new GradientPoint( 1.0, "#ffffff")
];

function loaded()
{
  clearTableRows( "gradientPointsTable");
  addTableRows( "gradientPointsTable", gradientPoints);
}

/**
 * Delete all but the first row (which is assumed to be a header row) from the
 * given table.
 * @param  {string} aTableId [description]
 * @return {[type]}          [description]
 */
function clearTableRows( aTableId: string)
{
  var tbl : HTMLTableElement;
  tbl = <HTMLTableElement> document.querySelector( "#" + aTableId);

  for (var i = 0; i < tbl.children.length; i++)
  {
    if (tbl.children[i].nodeType == Node.ELEMENT_NODE)
    {
      // Assume first element node we hit is the table body (tbody).
      var tbody : HTMLTableSectionElement = <HTMLTableSectionElement> tbl.children[i];
      if (tbody.rows)
      {
          while (tbody.rows.length > 1)
              tbody.deleteRow( 1);
      }
      break;
    }
  }
}

/**
 * Add one row for each GradientPoint to the table identified by the given id.
 * @param  {string}          aTableId        [description]
 * @param  {GradientPoint[]} aGradientPoints [description]
 * @return {[type]}                          [description]
 */
function addTableRows( aTableId: string, aGradientPoints: GradientPoint[])
{
  var tbl : HTMLTableElement;
  tbl = <HTMLTableElement> document.querySelector( "#" + aTableId);

  for (var i = 0; i < tbl.children.length; i++)
  {
    if (tbl.children[i].nodeType == Node.ELEMENT_NODE)
    {
      // Assume first element node we hit is the table body (tbody).
      var tbody : HTMLTableSectionElement = <HTMLTableSectionElement> tbl.children[i];
      if (tbody.rows)
      {
        for (var j = 0; j < aGradientPoints.length; j++)
        {
          insertNewRow( tbody, aGradientPoints[j]);
        }
        insertLastEmptyRow( tbody);
      }
    }
  }
}

/**
 * Insert (append, by default) a new gradient point row into the given table.
 * @param  {HTMLTableSectionElement} aTBody         Target table.
 * @param  {GradientPoint}           aGradientPoint GradientPoint to be inserted
 * @param  {[type]}                  anIndex=-1     Where to insert the new row, default is -1 (append)
 * @return {[type]}                                 None.
 */
function insertNewRow( aTBody: HTMLTableSectionElement, aGradientPoint: GradientPoint, anIndex = -1)
{
  var tr : HTMLTableRowElement = <HTMLTableRowElement> aTBody.insertRow( anIndex);
  var td : HTMLTableDataCellElement; // = <HTMLTableDataCellElement> tr.insertCell();

  // Buttons
  td = <HTMLTableDataCellElement> tr.insertCell( );
  var button : HTMLButtonElement = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "+";
  button.onclick = rowButtonClicked;
  td.appendChild( button);
  td = <HTMLTableDataCellElement> tr.insertCell( );
  button = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "-";
  button.onclick = rowButtonClicked;
  td.appendChild( button);

  // Position
  td = <HTMLTableDataCellElement> tr.insertCell();
  td.textContent = aGradientPoint.position.toString();

  // Color
  td = <HTMLTableDataCellElement> tr.insertCell();
  td.textContent = aGradientPoint.color;
}

/**
 * Appends one last row onto the table, containing only a single "+" button.
 * @param  {HTMLTableSectionElement} aTBody [description]
 * @return {[type]}                         [description]
 */
function insertLastEmptyRow( aTBody: HTMLTableSectionElement)
{
  var tr : HTMLTableRowElement = <HTMLTableRowElement> aTBody.insertRow();
  var td : HTMLTableDataCellElement; // = <HTMLTableDataCellElement> tr.insertCell();

  // Buttons
  td = <HTMLTableDataCellElement> tr.insertCell( );
  var button : HTMLButtonElement = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "+";
  button.onclick = rowButtonClicked;
  td.appendChild( button);
}

/**
 * A button in the gradient points table was clicked.
 * @param  {Event}  anEvent [description]
 * @return {[type]}         [description]
 */
function rowButtonClicked( anEvent: Event)
{
  var btn: HTMLButtonElement = <HTMLButtonElement> anEvent.currentTarget;
  var row: HTMLTableRowElement = <HTMLTableRowElement> walkUpToNodeType( btn, "TR");
  var tbody: HTMLTableSectionElement = <HTMLTableSectionElement> walkUpToNodeType( row, "TBODY");
  var i = row.rowIndex - 1;
  if (btn.textContent == "-")
  {
    tbody.deleteRow( row.rowIndex);
    // Yes, this is how you delete an array entry in Javascript.
    gradientPoints.splice( i, 1);
  }
  else
  {
    var newPosn: number;
    if (i == 0)
      newPosn = 0;
    else if (i == gradientPoints.length)
      newPosn = 1;
    else
      newPosn = (gradientPoints[i-1].position + gradientPoints[i].position)/2;
    var gp: GradientPoint = new GradientPoint( newPosn, "#999999");
    insertNewRow( tbody, gp, row.rowIndex );
    gradientPoints.splice( i, 0, gp);
  }
}

/**
 * Walk up the DOM tree STARTING WITH the given node, finding the first node that is of
 * the given type (aNodeName).  May return null.
 * @param  {Node}   aNode     [description]
 * @param  {string} aNodeName [description]
 * @return {Node}             [description]
 */
function walkUpToNodeType( aNode: Node, aNodeName: string): Node
{
  var walker: Node = aNode;
  while (walker != null && walker.nodeName != aNodeName)
  {
    walker = walker.parentNode;
  }
  return walker;
}
