import React, { Component } from "react";
import Tag from "./Tag";
import Cookies from 'universal-cookie';
import { WithContext as ReactTags } from 'react-tag-input';

class Tags extends Component {
    constructor() {
        super();
        this.state = {
            tags: []
        };

        this.handleAddition = this.handleAddition.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    // console.log(item)
    handleDelete = i => {
        this.setState({ tags: this.state.tags.filter((tag, index) => index !== i) });
    };

    handleAddition = tag => {
        this.setState({ tags: [...this.state.tags, tag] });
    };
    // removeTag = (i) => {
    //     const newTags = [...this.state.tags];
    //     newTags.splice(i, 1);
    //     this.setState({ tags: newTags });
    // }

    // inputKeyDown = (e) => {
    //     const val = e.target.value;
    //     if (e.key === 'Enter' && val) {
    //         if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
    //             return;
    //         }
    //         this.setState({ tags: [...this.state.tags, val] });
    //         this.tagInput.value = null;
    //     } else if (e.key === 'Backspace' && !val) {
    //         this.removeTag(this.state.tags.length - 1);
    //     }
    // }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.Id;
        // console.log(Id)

        fetch(`http://localhost:8080/service-api/tags/content/${Id}`, { //
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ tags: initialItems });
                // this.setState({filteredItems: initialItems})
                // console.log(this.state.tags)
            });
    };


    render() {
        // const { tags } = this.state;

        return (
            <div className="input-tag">
                <p> Tags </p>
                <div>
                    <ul className="input-tag__tags">
                        {this.state.tags.map((tag, i) => (
                            <div key={i}>
                                <Tag item={tag} key={i}/>
                                {/* console.log(i) */}
                                {/* <li key={tag}>
                                {tag}
                                <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                            </li> */}
                            </div>
                        ))}
                        {/* <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li> */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tags;



                // <ReactTags
                //         tags={this.state.tags}
                //         // suggestions={suggestions}
                //         // // delimiters={delimiters}
                //         // handleDelete={this.handleDelete}
                //         // handleAddition={this.handleAddition}
                //         // handleDrag={handleDrag}
                //         // handleTagClick={handleTagClick}
                //         // inputFieldPosition="bottom"
                //         // autocomplete
                //         labelField={'label'}
                //     />