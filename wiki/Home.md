# Expression Atlas Anatomogram: Technical Considerations

## Design

The props that determine which anatomogram and what parts will be displayed are `species`, `showIds`, `highlightIds` and `selectIds`. Changes in other props will not update the anatomogram. This is for behavioural and performance reasons. Please keep reading if you want to know more.

An initial implementation used the aforementioned props only to change the styles of the SVG elements. It’s a more declarative and idiomatic React design, the workflow being:
1. Render the SVG applying `showColour`/`showOpacity` to `showIds`, `highlightColour`/`highlightOpacity` to `highlightIds` and `selectColour`/`selectOpacity` to `selectIds`.
2. Run the callbacks `onMouseOver`, `onMouseOut` or `onClick` respectively on events `mouseover`, `mouseout` or `click`.
3. The component that renders `Anatomogram` would hold the state of shown/highlighted/selected IDs and update it using the callbacks. So that e.g. `onMouseOver` would add the `id` of the SVG element to the highlighted IDs and that would flow down to the `Anatomogram` component, updating the appearance of the referenced tissue.

Unfortunately such implementation suffers and makes the anatomogram SVG less snappy: there’s a noticeable lag between the mouse cursor hovering on/off an element and its appearance reacting to the event. Additionally, the `<title>` tag isn’t displayed when the cursor stays on the shape. The reason being, presumably, because the event happened over an element which was re-rendered, not on the actual one that’s displayed afterwards. This is a usability concern, as displaying the name of the tissue is a big help for end users.

In summary, some drawing “rules” are applied to the shapes whose IDs are passed in `showIds`, `highlightIds` and `selectIds`, and those props should be used to react to other component’s state or user actions; on the other hand there are some appearance changes performed by the component itself using the DOM API. These are detailed in the next section. 

## Basic behaviour

Elements whose IDs are in `showIds` are displayed with `style="fill: this.props.showColour;opacity: this.props.showOpacity"` and, on `mouseover`, changed to `style="fill: this.props.highlightColour;opacity: this.props.highlightOpacity"`. Below is an example with the human heart and the default values:

![Show heart](https://github.com/gxa/anatomogram/blob/master/wiki/img/show_heart.png) ![Show heart on mouseover](https://github.com/gxa/anatomogram/blob/master/wiki/img/show_heart_mouseover.png)

Elements whose IDs are in `highlightIds` are displayed with `style="fill: this.props.highlightColour;opacity: this.props.highlightOpacity"` and, on `mouseover`, changed to `style="fill: this.props.highlightColour;opacity: this.props.highlightOpacity + 0.2"`. Below is an example with the human heart and the default values:

![Highlight heart](https://github.com/gxa/anatomogram/blob/master/wiki/img/highlight_heart.png) ![Highlight heart on mouseover](https://github.com/gxa/anatomogram/blob/master/wiki/img/highlight_heart_mouseover.png)

Elements whose IDs are in `selectIds` are displayed with `style="fill: this.props.selectColour;opacity: this.props.selectOpacity"` and, on `mouseover`, changed to `style="fill: this.props.selectColour;opacity: this.props.selectOpacity + 0.2"`. Below is an example with the human heart and the default values:

![Select heart](https://github.com/gxa/anatomogram/blob/master/wiki/img/select_heart.png) ![Select heart on mouseover](https://github.com/gxa/anatomogram/blob/master/wiki/img/select_heart_mouseover.png)

There is no modification in appearance on `click`. If an ID is present in different props `selectIds` and `highlightIds`, in that order, will take precedence.

## SVG injection

The anatomogram SVG is rendered by [react-svg](https://github.com/atomic-app/react-svg), which in turn uses [SVGInjector](https://www.npmjs.com/package/react-svg). The SVG file is loaded asynchronously with an instance of [`XMLHttpRequest`](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest), therefore there are no guarantees of the SVG file being loaded and ready when `componentDidMount` or `componentDidUpdate` are run. That’s why all changes to the SVG are carried out using the `callback` prop that `react-svg` provides.

## Example

An example component that tries to capture all the points above can be found in [`html/AnatomogramDemo.js`](https://github.com/gxa/anatomogram/blob/master/html/AnatomogramDemo.js). You may see it in action at https://gxa.github.io/anatomogram-demo/index.html or you may run it locally with Webpack: just run `webpack-dev-server` and point your browser to `http://localhost:9000/html`.
