// =====================================================================================================================

/**
This function appears to be a helper function for rendering virtual DOM nodes as actual DOM nodes in a web page.
The function takes a virtual DOM node (often abbreviated as "VDOM node" or simply "vnode") as an argument and returns an actual DOM node that can be added to the web page.

 ~~~~> Step 1 <~~~~
 First, the function will check if the vnode is a string by checking if it has a "split" property.
 If it does, this indicates that the vnode is a string, so the function creates a new text node with the string as its value and returns it.
 This allows the function to handle text nodes in addition to regular DOM elements.

 ~~~~> Step 2 <~~~~
 If the vnode is not a string, the function creates a new DOM element with the "nodeName" of the vnode.
 For example, if the vnode has a "nodeName" of "div", the function will create a new "div" element.

 ~~~~> Step 3 <~~~~
 Next, the function copies any attributes that the vnode has onto the newly-created DOM element.
 For example, if the vnode has an "id" attribute with a value of "my-id", the function will set the "id" attribute of the new DOM element to "my-id" using the "setAttribute" method.

 ~~~~> Step 4 <~~~~
 Finally, the function recursively renders and appends any child nodes that the vnode has.
 It does this by calling the "render" function on each child node and appending the resulting DOM node to the newly-created DOM element.
 When all child nodes have been processed, the function returns the newly-created DOM element.
 */

// An example of how the "render" function might be used:

/** 
 let vnode = {
  nodeName: "div",
  attributes: {
    id: "my-div",
  },
  children: [
    "This is the content of my div element",
    {
      nodeName: "p",
      attributes: {
        class: "my-paragraph",
      },
      children: ["This is a paragraph inside my div element"],
    },
  ],
};
let domNode = render(vnode);
*/

// Explaining the example:

/**
 In this example, the "render" function would create a new "div" element with an "id" attribute set to "my-div",
 and it would also create a new "p" element with a "class" attribute set to "my-paragraph".
 The text node "This is the content of my div element" would be appended to the "div" element, 
 and the "p" element with the text node "This is a paragraph inside my div element" would be appended to the "div" element as well.
 Finally, the "render" function would return the "div" element, which could then be added to the web page.
 */

function render(vnode) {
  // Strings just convert to #text Nodes
  if (vnode.split) return document.createTextNode(vnode);

  // create a DOM element with the nodeName of our VDOM element
  let n = document.createElement(vnode.nodeName);

  // copy attributes onto the new node
  let a = vnode.attributes || {};
  Objects.keys(a).forEach((k) => n.setAttribute(k, a[k]));

  // render (build) and then appen child nodes
  (vnode.children || []).forEach((c) => n.appenChild(render(c)));

  return n;
}

// =====================================================================================================================

/**
 This is a function that creates an object representaing a DOM node.
 The function takes in three arguments: "nodeName", "attributes", and "...args".
 ~~~~> "nodeName" : represents the name of the DOM node.
 ~~~~> "attributes" : represents an object containing the attributes for the node.
 ~~~~> "...args" : is used to capture any number of additional arguments that represents the chidren of the node.
 */

// For example, if we called the function like this:

// h("div", {id:"foo"}, "hello, world!")

// The resulting object would look like this:

/**  {
     nodeName: "div",
     attributes: {
         "id": "foo"
     },
     children: ["hello, world!"]
    }
*/

// This function is typically used to create a tree of objects that represents a DOM tree.
// This tree of objects can then be used to render HTML content on a page.

function h(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;

  //   console.log("nodeName--->>>", nodeName);
  //   console.log("attributes---->>>", attributes);
  //   console.log("args---->>>", ...args);
  return {
    nodeName,
    attributes,
    children,
  };
}
