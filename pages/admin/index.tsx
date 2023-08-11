import { NextPage } from "next";
import ContentWrapper from "../../Component/admin/ContentWrapper";
import LatestPostListCard from "../../Component/admin/LatestPostListCard";
import LatestCommentListCard from "../../Component/admin/LatestCommentListCard";
import { useEffect, useState } from "react";
import {
  LatestComment,
  LatestUserProfile,
  PostDetail,
} from "../../Utils/types";
import axios from "axios";
import LatesUserTable from "../../Component/admin/LatesUserTable";

interface AdminProps {}

const Admin: NextPage<AdminProps> = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();
  useEffect(() => {
    axios("/api/posts?limit=5&skip=0")
      .then(({ data }) => setLatestPosts(data.posts))
      .catch((err) => console.log(err));
    axios("/api/comment/latest")
      .then(({ data }) => setLatestComments(data.comments))
      .catch((err) => console.log(err));
    axios("/api/user")
      .then(({ data }) => setLatestUsers(data.users))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin/posts" title="latest Posts">
          {latestPosts?.map((p, id) => (
            <LatestPostListCard
              key={id}
              title={p.title}
              slug={p.slug}
              meta={p.meta}
            />
          ))}
        </ContentWrapper>
        <ContentWrapper seeAllRoute="/admin/comments" title="latest Comment">
          {latestComments?.map((c, id) => (
            <LatestCommentListCard key={id} comment={c} />
          ))}
        </ContentWrapper>
      </div>
      <ContentWrapper seeAllRoute="/admin/comments" title="latest Users">
        <LatesUserTable users={latestUsers} />
      </ContentWrapper>
    </>
  );
};

export default Admin;
