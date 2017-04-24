import {getSuggestions} from '../api/suggestions';


export default class AutoComplete {

    constructor(element) {
        this.element = element;
        this.element.addEventListener('input', this.onInput.bind(this));
    }

    onInput(event) {

        const input = event.target;
        const query = input.value.trim();
        const searchId = this.searchId = Math.random();
        // TODO: handle an empty query
        // If the query is empty then the requirement is for the list of suggestions to be emptied.
        if (!query) {
          this.renderSuggestions(query, [], searchId);
        }

        getSuggestions(event.target.value).then(suggestions => {

            // TODO: drop suggestions that are not for the most recent query
            // `getSuggestions` will take between 50ms and 350ms to resolve, much like if it were
            // talking to a real API. This means that as the user types and `getSuggestions` is called
            // it is possible that a result for an older query resolves before the result for a newer query.
            //
            // This is visualised like so:
            //
            //     query 1 ------------------> a 0.2
            //         query 2 ------> ab  0.6
            //             query 3 ------> abc 0.7
            //
            // As you can see the results for query 2 come in first, then query 3, and finally query 1.
            // Before calling `renderSuggestions` you need to check that the value of the input has not
            // changed since this request was made.
            this.renderSuggestions(query, suggestions, searchId);

        });
    }

    // Modified the renderSuggestions to accomodate the SearchID which should solve the problem of
    // getting the most recent query
    renderSuggestions(query, suggestions, searchId) {
        const list = this.element.querySelector('.autocomplete__suggestions');

        // Using a token-like system to make sure only the newest query is resolved
        if (searchId !== this.searchId) {
          return;
        }

        const directSuggestions = [];
        const otherSuggestions = [];

        //Using regex and high-order functions for returning seaches based on index
        const searchRegex = new RegExp("^" + query, "i");
        suggestions.forEach(currentSuggestion => {
          if (searchRegex.test(currentSuggestion)) {
            directSuggestions.push(currentSuggestion);
          } else {
            otherSuggestions.push(currentSuggestion);
          }
        });
        list.innerHTML = "";
        suggestions = directSuggestions.concat(otherSuggestions);
        suggestions.forEach(currentSuggestion => {
          const newLi = document.createElement("li");
          newLi.classList.add("autocomplete__suggestion");
          let innerHTML = currentSuggestion;
          const reg = new RegExp(query, 'gi');
          innerHTML = innerHTML.replace(reg, str => '<em>' + str + '</em>');
          newLi.innerHTML = innerHTML;
          list.appendChild(newLi);
        });

        // TODO: implement the rest of this method
        // Some things to consider:
        //

        //   X2. `getSuggestions` will return ANY store that contained the query in alphabetical
        //       order, you might want to consider ordering the returned suggestion by the index
        //       of the match so that , "Les Foo", "Les Nouvelles" is considered a more direct match to the query
        //       "les" than "Charles David", despite "C" being alphabetically before "L"


        //   1. Each item being added to `list` will need to have the class ".autocomplete__suggestion"
        //      to benefit from the styling applied in css/modules/autocomplete.less

        //
        //   3. You might want to wrap the bit of the suggestion that matches the query with an <em>
        //      element and then add some CSS to style it. An example would be turning "Les Nouvelles"
        //      into "<em>Les</em> Nouvelles" for the query "les".
    }

}
