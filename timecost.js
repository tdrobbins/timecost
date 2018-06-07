chrome.storage.sync.get(["active", "wage"], function(data) {

  console.log(window.location.hostname);

  if (data.active) {
      let regex = /\$\d{1,3}(?:(,\d{3})*|(\d{3})*)(?:\.\d{2})?/gm
      hourlyWage = data.wage

      var minuteWage = hourlyWage / 60

      var format = "\$${price} (${days!=0 ? days+'d ' : ''}${hours!=0 ? hours+'h' : ''}${hours*minutes !=0 ? ' ' : '' }${minutes != 0 ? minutes+'m' : ''})"

      function reformat(price) {
        let totalMinutes = price.replace(/\$|\,/g, "") / minuteWage;
        if (totalMinutes === 0) {
          return `$${price}`
        } else {
  
          var days = Math.trunc(totalMinutes / 1440);
          totalMinutes -= days * 1440;
          var hours = Math.trunc(totalMinutes / 60);
          totalMinutes -= hours * 60;
          var minutes = Math.round(totalMinutes % 60);

          if (minutes == 60) {
            minutes = 0;
            hours += 1;
          }

          return eval("`" + format + "`")
        }
      }

      function replaceText(node) {
        // Setting textContent on a node removes all of its children and replaces
        // them with a single text node. Since we don't want to alter the DOM aside
        // from substituting text, we only substitute on single text nodes.
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        if (node.nodeType === Node.TEXT_NODE) {
          // This node only contains text.
          // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

          // Skip textarea nodes due to the potential for accidental submission
          // of substituted emoji where none was intended.
          if (node.parentNode &&
            node.parentNode.nodeName === 'TEXTAREA') {
            return;
          }

          // Because DOM manipulation is slow, we don't want to keep setting
          // textContent after every replacement. Instead, manipulate a copy of
          // this string outside of the DOM and then perform the manipulation
          // once, at the end.
          let content = node.textContent;

          // Actually do the replacement / substitution.
          // Note: if 'word' does not appear in 'content', nothing happens.
          if (content.match(regex)) {
            content.match(regex).forEach(function(price) {
              content = content.replace(price, reformat(price));
            });
            node.textContent = content;
            void(node.offsetHeight)
          }

          // Now that all the replacements are done, perform the DOM manipulation.
          // node.textContent = content;

        } else {
          // This node contains more than just text, call replaceText() on each
          // of its children.
          for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
          }
        }
      }

      // Start the recursion from the body tag.
      replaceText(document.body);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // This DOM change was new nodes being added. Run our substitution
            // algorithm on each newly added node.
            for (let i = 0; i < mutation.addedNodes.length; i++) {
              const newNode = mutation.addedNodes[i];
              replaceText(newNode);
            }
          }
        });
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

    }
  })
;
