class GradientPoint
{
    position: Number;
    color: string;
    constructor( aPosition: Number, aColor: string)
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

function insertNewRow( aTBody: HTMLTableSectionElement, aGradientPoint: GradientPoint)
{
  var tr : HTMLTableRowElement = <HTMLTableRowElement> aTBody.insertRow();
  var td : HTMLTableDataCellElement; // = <HTMLTableDataCellElement> tr.insertCell();

  // Buttons
  td = <HTMLTableDataCellElement> tr.insertCell( );
  var button : HTMLButtonElement = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "+";
  td.appendChild( button);
  td = <HTMLTableDataCellElement> tr.insertCell( );
  button = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "-";
  td.appendChild( button);

  // Position
  td = <HTMLTableDataCellElement> tr.insertCell();
  td.textContent = aGradientPoint.position.toString();

  // Color
  td = <HTMLTableDataCellElement> tr.insertCell();
  td.textContent = aGradientPoint.color;
}

function insertLastEmptyRow( aTBody: HTMLTableSectionElement)
{
  var tr : HTMLTableRowElement = <HTMLTableRowElement> aTBody.insertRow();
  var td : HTMLTableDataCellElement; // = <HTMLTableDataCellElement> tr.insertCell();

  // Buttons
  td = <HTMLTableDataCellElement> tr.insertCell( );
  var button : HTMLButtonElement = <HTMLButtonElement> document.createElement( "BUTTON");
  button.textContent = "+";
  td.appendChild( button);
}
