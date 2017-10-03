import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "DraftEditor-editorContainer": {
        "height": "inherit",
        "textAlign": "initial",
        "backgroundColor": "rgba(255,255,255,0)",
        "borderLeft": ".1px solid transparent",
        "position": "relative",
        "zIndex": 1
    },
    "DraftEditor-root": {
        "height": "inherit",
        "textAlign": "initial",
        "position": "relative"
    },
    "public-DraftEditor-content": {
        "height": "inherit",
        "textAlign": "initial"
    },
    "public-DraftEditor-content[contenteditable=true]": {
        "WebkitUserModify": "read-write-plaintext-only"
    },
    "public-DraftEditor-block": {
        "position": "relative"
    },
    "DraftEditor-alignLeft public-DraftStyleDefault-block": {
        "textAlign": "left"
    },
    "DraftEditor-alignLeft public-DraftEditorPlaceholder-root": {
        "left": 0,
        "textAlign": "left"
    },
    "DraftEditor-alignCenter public-DraftStyleDefault-block": {
        "textAlign": "center"
    },
    "DraftEditor-alignCenter public-DraftEditorPlaceholder-root": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "textAlign": "center",
        "width": "100%"
    },
    "DraftEditor-alignRight public-DraftStyleDefault-block": {
        "textAlign": "right"
    },
    "DraftEditor-alignRight public-DraftEditorPlaceholder-root": {
        "right": 0,
        "textAlign": "right"
    },
    "public-DraftEditorPlaceholder-root": {
        "color": "#9197a3",
        "position": "absolute",
        "zIndex": 0
    },
    "public-DraftEditorPlaceholder-hasFocus": {
        "color": "#bdc1c9"
    },
    "DraftEditorPlaceholder-hidden": {
        "display": "none"
    },
    "public-DraftStyleDefault-block": {
        "position": "relative",
        "whiteSpace": "pre-wrap"
    },
    "public-DraftStyleDefault-ltr": {
        "direction": "ltr",
        "textAlign": "left"
    },
    "public-DraftStyleDefault-rtl": {
        "direction": "rtl",
        "textAlign": "right"
    },
    "public-DraftStyleDefault-listLTR": {
        "direction": "ltr"
    },
    "public-DraftStyleDefault-listRTL": {
        "direction": "rtl"
    },
    "public-DraftStyleDefault-ol": {
        "marginTop": 16,
        "marginRight": 0,
        "marginBottom": 16,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "public-DraftStyleDefault-ul": {
        "marginTop": 16,
        "marginRight": 0,
        "marginBottom": 16,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "public-DraftStyleDefault-depth0public-DraftStyleDefault-listLTR": {
        "marginLeft": 1.5
    },
    "public-DraftStyleDefault-depth0public-DraftStyleDefault-listRTL": {
        "marginRight": 1.5
    },
    "public-DraftStyleDefault-depth1public-DraftStyleDefault-listLTR": {
        "marginLeft": 3
    },
    "public-DraftStyleDefault-depth1public-DraftStyleDefault-listRTL": {
        "marginRight": 3
    },
    "public-DraftStyleDefault-depth2public-DraftStyleDefault-listLTR": {
        "marginLeft": 4.5
    },
    "public-DraftStyleDefault-depth2public-DraftStyleDefault-listRTL": {
        "marginRight": 4.5
    },
    "public-DraftStyleDefault-depth3public-DraftStyleDefault-listLTR": {
        "marginLeft": 6
    },
    "public-DraftStyleDefault-depth3public-DraftStyleDefault-listRTL": {
        "marginRight": 6
    },
    "public-DraftStyleDefault-depth4public-DraftStyleDefault-listLTR": {
        "marginLeft": 7.5
    },
    "public-DraftStyleDefault-depth4public-DraftStyleDefault-listRTL": {
        "marginRight": 7.5
    },
    "public-DraftStyleDefault-unorderedListItem": {
        "listStyleType": "square",
        "position": "relative"
    },
    "public-DraftStyleDefault-unorderedListItempublic-DraftStyleDefault-depth0": {
        "listStyleType": "disc"
    },
    "public-DraftStyleDefault-unorderedListItempublic-DraftStyleDefault-depth1": {
        "listStyleType": "circle"
    },
    "public-DraftStyleDefault-orderedListItem": {
        "listStyleType": "none",
        "position": "relative"
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-listLTR:before": {
        "left": -36,
        "position": "absolute",
        "textAlign": "right",
        "width": 30
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-listRTL:before": {
        "position": "absolute",
        "right": -36,
        "textAlign": "left",
        "width": 30
    },
    "public-DraftStyleDefault-orderedListItem:before": {
        "content": "counter(ol0) \". \"",
        "counterIncrement": "ol0"
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-depth1:before": {
        "content": "counter(ol1) \". \"",
        "counterIncrement": "ol1"
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-depth2:before": {
        "content": "counter(ol2) \". \"",
        "counterIncrement": "ol2"
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-depth3:before": {
        "content": "counter(ol3) \". \"",
        "counterIncrement": "ol3"
    },
    "public-DraftStyleDefault-orderedListItempublic-DraftStyleDefault-depth4:before": {
        "content": "counter(ol4) \". \"",
        "counterIncrement": "ol4"
    },
    "public-DraftStyleDefault-depth0public-DraftStyleDefault-reset": {
        "counterReset": "ol0"
    },
    "public-DraftStyleDefault-depth1public-DraftStyleDefault-reset": {
        "counterReset": "ol1"
    },
    "public-DraftStyleDefault-depth2public-DraftStyleDefault-reset": {
        "counterReset": "ol2"
    },
    "public-DraftStyleDefault-depth3public-DraftStyleDefault-reset": {
        "counterReset": "ol3"
    },
    "public-DraftStyleDefault-depth4public-DraftStyleDefault-reset": {
        "counterReset": "ol4"
    },
    "[class*=\"-wrapper\"] img": {
        "width": 22,
        "height": 22
    }
});