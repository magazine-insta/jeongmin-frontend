import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from '../elements';
// import { instance } from '../services/axios';

const InfinityScroll = (props) => {
  // 렌더링 데이터 저장
  const [items, setItems] = useState([]);
  console.log(items);
  // getPostAxios 모든 데이터 저장
  const [posts, setPosts] = useState([]);
  console.log(posts);
  // 로딩 시 boolean 값 판별
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);

  // const fetchPost = async () => {
  //   setIsLoading(true);
  //   setItems(items.concat(posts.slice(0, 3)));
  //   setPosts(posts.slice(3));
  //   setIsLoading(false);
  // };

  // const handleScroll = useCallback(() => {
  //   const { scrollHeight } = document.body;
  //   const { innerHeight } = window;
  //   const scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   if (scrollHeight - innerHeight - scrollTop < 200) {
  //     fetchPost();
  //   }
  // }, [isLoading]);

  // const getFetchData = async () => {
  //   await instance
  //     .get('api/post')
  //     .then((res) => {
  //       let resp = res.data;
  //       setItems(resp.slice(0, 3));
  //       resp = resp.slice(3);
  //       setPosts(resp);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       return Promise.reject(err);
  //     });
  // };
 
  // useEffect(() => {
  //   getFetchData();
  // });

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, true);
  //   return () => window.removeEventListener('scroll', handleScroll, true);
  // }, [handleScroll]);

  return (
    <React.Fragment>
      {props.children}
      {isLoading && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {};

export default InfinityScroll;
