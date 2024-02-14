import Avatar from "./Avatar";
import Button from "./Button";
import { useState } from "react";

export default function FeedbackItemPopupComments(){
    const [commentText, setCommentText] = useState('')
    return(
        <div className="p-8">
            <div className="flex gap-4 mb-8">
            <Avatar/>
            <div>
            <p className="text-gray-600">lorem ipsum dolor sit amet,lorem ipsum dolor sit amet, lorem ipsum  dolor sit amet,lorem ipsum dolor sit amet, lorem ipsum dolor sit  amet,lorem ipsum dolor sit amet, lorem ipsum dolor sit amet,lorem   ipsum dolor sit amet, lorem ipsum dolor sit amet,",
            </p>
            <div className="text-gray-400 mt-2 text-sm">Anonymus &middot; a few seconds ago</div>
            </div>
            </div>
            <form>
                <textarea className="border rounded-md w-full p-2" placeholder="lets us know"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                >
                </textarea>

                <div className="flex justify-end mt-2">
                    {/* <Button>Attach Files</Button> */}
                    <Button primary disabled={commentText === ''}>Comment</Button>
                </div>

            </form>
        </div>
    )
}