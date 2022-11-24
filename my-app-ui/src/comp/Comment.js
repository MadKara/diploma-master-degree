import React from "react";

const Comment = (props) => {
    let item = props.item;
    console.log(item)

    return (
        // <div>
            <div class="comment-thread">
                <details open class="comment" id="comment-1">
                    <a href="#comment-1" class="comment-border-link">
                        <span class="sr-only">Jump to comment-1</span>
                    </a>
                    <summary>
                        <div class="comment-heading">
                            {/* <div class="comment-voting"> */}
                            <img src={item.user.avatarPath} width='50px' />
                            {/* <button type="button">
                            <span aria-hidden="true">&#9650;</span>
                            <span class="sr-only">Vote up</span>
                        </button>
                        <button type="button">
                            <span aria-hidden="true">&#9660;</span>
                            <span class="sr-only">Vote down</span>
                        </button> */}
                            {/* </div> */}
                            <div class="comment-info">
                                <a href="#" class="comment-author">{item.user.userName}</a>
                                <p class="m-0">
                                    {item.dateTime}
                                </p>
                            </div>
                        </div>
                    </summary>
                    <div class="comment-body">
                        <p>{item.message}</p>
                        <button type="button" data-toggle="reply-form" data-target="comment-1-reply-form">Reply</button>
                        <button type="button">Flag</button>

                        {/* <!-- Reply form start --> */}
                        <form method="POST" class="reply-form d-none" id="comment-1-reply-form">
                            <textarea placeholder="Reply to comment" rows="4"></textarea>
                            <button type="submit">Submit</button>
                            <button type="button" data-toggle="reply-form" data-target="comment-1-reply-form">Cancel</button>
                        </form>
                        {/* <!-- Reply form end --> */}
                    </div>


                </details>
                {/* <!-- Comment 1 end --> */}
            </div>
        // </div>
    );
};

export default Comment;