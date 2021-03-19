import React from "react";
import { Classes } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import UnpublishedCommentThread from "./UnpublishedCommentThread";
import InlineCommentPin from "./InlineCommentPin";
import {
  refCommentThreadsSelector,
  unpublishedCommentThreadSelector,
} from "./selectors";
import { getCurrentApplicationId } from "selectors/editorSelectors";

const CommentThreadPopoverStyles = createGlobalStyle`
  .comment-thread .${Classes.POPOVER_CONTENT} {
    border-radius: 0px;
  }
`;

const Comments = ({ refId }: { refId: string }) => {
  const applicationId = useSelector(getCurrentApplicationId);
  const commentsThreadIds = useSelector(
    refCommentThreadsSelector(refId, applicationId),
  );
  const unpublishedCommentThread = useSelector(
    unpublishedCommentThreadSelector(refId),
  );

  return (
    <>
      <CommentThreadPopoverStyles />
      {Array.isArray(commentsThreadIds) &&
        commentsThreadIds.map((commentsThreadId: any) => (
          <InlineCommentPin
            commentThreadId={commentsThreadId}
            key={commentsThreadId}
          />
        ))}
      {unpublishedCommentThread && (
        <UnpublishedCommentThread commentThread={unpublishedCommentThread} />
      )}
    </>
  );
};

export default Comments;
