import React from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '../elements';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { history } from '../redux/configureStore';
import { actionCreators as postActions } from '../redux/modules/post';

const PostDetail = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);
  console.log(user_info)
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <>
          <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
          {post.user_info.user_id === user_info?.uid ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                <Button
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  메인으로
                </Button>
                <Button
                  onClick={() => {
                    history.push(`/write/${id}`);
                  }}
                >
                  수정하기
                </Button>
                <Button
                  onClick={() => {
                    dispatch(postActions.deletePostAxios(id));
                  }}
                >
                  삭제하기
                </Button>
              </ButtonGroup>
            </Box>
          ) : (
            <Grid center>
              <Button
                variant="outlined"
                onClick={() => {
                  history.push('/');
                }}
              >
                메인으로
              </Button>
            </Grid>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default PostDetail;
