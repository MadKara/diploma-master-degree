import React from "react";

const Comment = (props) => {
    let item = props.item;

    return (
        <div className="comment-thread">
            <details open className="comment">
                <div className="comment-border-link"></div>
                <summary>
                    <div className="comment-heading">
                        <img src={item.user.avatarPath} width='50px' />
                        <div className="comment-info">
                            <a href="#" className="comment-author">{item.user.userName}</a>
                            <p className="m-0">
                                {item.dateTime}
                            </p>
                        </div>
                    </div>
                </summary>
                <div className="comment-body">
                    <p>{item.message}</p>
                </div>
            </details>
        </div>
    );
};

export default Comment;