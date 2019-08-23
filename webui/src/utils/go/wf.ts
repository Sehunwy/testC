import go, { Binding } from "gojs";
import { IndexObject } from "../../types/index";
const make = go.GraphObject.make;
import { API_BASE_URL } from "@/utils/conf";

export function getworkflow(id: string) {
  let conf = {
    initialContentAlignment: go.Spot.Top,
    allowDrop: true, // must be true to accept drops from the Palette
    ["LinkDrawn"]: showLinkLabel, // this DiagramEvent listener is defined below
    ["LinkRelinked"]: showLinkLabel,
    scrollsPageOnFocus: false,
    ["undoManager.isEnabled"]: true // enable undo & redo
  };
  let d = make(go.Diagram, id, conf);
  setDefaultNodeTemplate(d);
  setCommentNodeTemplate(d);
  setConditionNodeTemplate(d);
  setStartTemplate(d);
  setEndTemplate(d);
  setLinkTemplate(d);

  d.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
  d.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
  return d;
}

export function getPaletter(g: go.Diagram, id: string) {
  let myPalette = make(
    go.Palette,
    id, // must name or refer to the DIV HTML element
    {
      scrollsPageOnFocus: false,
      nodeTemplateMap: g.nodeTemplateMap, // share the templates used by myDiagram
      model: new go.GraphLinksModel([
        // specify the contents of the Palette
        {
          category: "Start",
          text: "开始",
          source: API_BASE_URL + "image/little/5bf66722d2a0eb18c044088b"
        },
        { text: "步骤" },
        { category: "Conditional", text: "条件" },
        { category: "End", text: "结束" },
        { category: "Comment", text: "注释" }
      ])
    }
  );
  return myPalette;
}

function setDefaultNodeTemplate(d: go.Diagram) {
  // new go.Picture();
  d.nodeTemplateMap.add(
    "", // the default category
    make(
      go.Node,
      "Table",
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      make(
        go.Panel,
        "Auto",
        make(
          go.Shape,
          "Rectangle",
          { fill: "#00A9C9", strokeWidth: 0 },
          new go.Binding("figure", "figure")
        ),
        make(
          go.TextBlock,
          textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      ),
      // four named ports, one on each side:
      makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
    )
  );
}

function setConditionNodeTemplate(d: go.Diagram) {
  d.nodeTemplateMap.add(
    "Conditional",
    make(
      go.Node,
      "Table",
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      make(
        go.Panel,
        "Auto",
        make(
          go.Shape,
          "Diamond",
          { fill: "#00A9C9", strokeWidth: 0 },
          new go.Binding("figure", "figure")
        ),
        make(
          go.TextBlock,
          textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      ),
      // four named ports, one on each side:
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    )
  );
}

function setStartTemplate(d: go.Diagram) {
  d.nodeTemplateMap.add(
    "Start",
    make(
      go.Node,
      "Table",
      nodeStyle(),
      make(
        go.Panel,
        "Auto",
        make(go.Shape, "Circle", {
          minSize: new go.Size(40, 40),
          fill: "#79C900",
          strokeWidth: 0
        }),
        // make(go.Picture, { width: 40, height: 40 }, new go.Binding("source")),
        make(go.TextBlock, "Start", textStyle(), new go.Binding("text"))
      ), // three named ports, one on each side except the top, all output only:
      makePort("L", go.Spot.Left, go.Spot.Left, true, false),
      makePort("R", go.Spot.Right, go.Spot.Right, true, false),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    )
  );
}

function setEndTemplate(d: go.Diagram) {
  d.nodeTemplateMap.add(
    "End",
    make(
      go.Node,
      "Table",
      nodeStyle(),
      make(
        go.Panel,
        "Auto",
        make(go.Shape, "Circle", {
          minSize: new go.Size(40, 40),
          fill: "#DC3C00",
          strokeWidth: 0
        }),
        make(go.TextBlock, "End", textStyle(), new go.Binding("text"))
      ),
      // three named ports, one on each side except the bottom, all input only:
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, false, true),
      makePort("R", go.Spot.Right, go.Spot.Right, false, true)
    )
  );
}

function setCommentNodeTemplate(d: go.Diagram) {
  d.nodeTemplateMap.add(
    "Comment",
    make(
      go.Node,
      "Auto",
      nodeStyle(),
      make(go.Shape, "File", { fill: "#EFFAB4", strokeWidth: 0 }),
      make(
        go.TextBlock,
        textStyle(),
        {
          margin: 5,
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          textAlign: "center",
          editable: true,
          font: "bold 12pt Helvetica, Arial, sans-serif",
          stroke: "#454545"
        },
        new go.Binding("text").makeTwoWay()
      )
      // no ports, because no links are allowed to connect with a comment
    )
  );
}

function setLinkTemplate(d: go.Diagram) {
  d.linkTemplate = make(
    go.Link, // the whole link panel
    {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpOver,
      corner: 5,
      toShortLength: 4,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,
      // mouse-overs subtly highlight links:
      mouseEnter: (e, link) => {
        link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
      },
      mouseLeave: (e, link) => {
        link.findObject("HIGHLIGHT").stroke = "transparent";
      },
      selectionAdorned: false
    },
    new go.Binding("points").makeTwoWay(),
    make(
      go.Shape, // the highlight shape, normally transparent
      {
        isPanelMain: true,
        strokeWidth: 8,
        stroke: "transparent",
        name: "HIGHLIGHT"
      }
    ),
    make(
      go.Shape, // the link path shape
      { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
      new go.Binding("stroke", "isSelected", sel => {
        return sel ? "dodgerblue" : "gray";
      }).ofObject()
    ),
    make(
      go.Shape, // the arrowhead
      { toArrow: "standard", strokeWidth: 0, fill: "gray" }
    ),
    make(
      go.Panel,
      "Auto", // the link label, normally not visible
      { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
      new go.Binding("visible", "visible").makeTwoWay(),
      make(
        go.Shape,
        "RoundedRectangle", // the label shape
        { fill: "#F8F8F8", strokeWidth: 0 }
      ),
      make(
        go.TextBlock,
        "Yes", // the label
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#333333",
          editable: true
        },
        new go.Binding("text").makeTwoWay()
      )
    )
  );
}

function showLinkLabel(e) {
  let label = e.subject.findObject("LABEL");
  if (label !== null) {
    label.visible = e.subject.fromNode.data.category === "Conditional";
  }
}

function makePort(name, align, spot, output, input) {
  let horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
  // the port is basically just a transparent rectangle that stretches along the side of the node,
  // and becomes colored when the mouse passes over it
  return make(go.Shape, {
    fill: "transparent", // changed to a color in the mouseEnter event handler
    strokeWidth: 0, // no stroke
    width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
    height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
    alignment: align, // align the port on the main Shape
    stretch: horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical,
    portId: name, // declare this object to be a "port"
    fromSpot: spot, // declare where links may connect at this port
    fromLinkable: output, // declare whether the user may draw links from here
    toSpot: spot, // declare where links may connect at this port
    toLinkable: input, // declare whether the user may draw links to here
    cursor: "pointer", // show a different cursor to indicate potential link point
    mouseEnter: (e, port) => {
      // the PORT argument will be this Shape
      if (!e.diagram.isReadOnly) {
        port.fill = "rgba(255,0,255,0.5)";
      }
    },
    mouseLeave: (e, port) => {
      port.fill = "transparent";
    }
  });
}

function textStyle() {
  return {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    stroke: "whitesmoke"
  };
}

function nodeStyle() {
  return [
    // The Node.location comes from the "loc" property of the node data,
    // converted by the Point.parse static method.
    // If the Node.location is changed, it updates the "loc" property of the node data,
    // converting back using the Point.stringify static method.
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    {
      // the Node.location is at the center of each node
      locationSpot: go.Spot.Center
    }
  ];
}
