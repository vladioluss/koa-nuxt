const Router = require('koa-router')
const router = new Router()
const Post = require('../models/post')
const comments = require('../models/comments')


router.get('/posts', async ctx => {
  await Post.findAll()
    .then(posts => {
      ctx.body = posts
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

router.get('/posts/:id', async ctx => {
  await Post.findOne({
    where: {
      id: ctx.params.id
    }
  })
    .then(post => {
      if (post) {
        ctx.body = post
        
      } else {
        ctx.body = 'Post doesnt exist'
      }
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

router.post('/add', async ctx => {
  if (!ctx.request.body.header) {
    ctx.body = {
      error: 'Bad Data'
    }
  } else {
    await Post.create(ctx.request.body)
      .then(data => {
        ctx.body = data
        console.log(data.dataValues)
      })
      .catch(err => {
        ctx.body = 'ERROR: ' + err
      })
  }
})

router.delete('/post/:id', async ctx => {
  await Post.destroy({
    where: {
      id: ctx.params.id
    }
  })
    .then(() => {
      ctx.body = { status: 'Post Deleted' }
    })
    .catch(err => {
      ctx.body = 'ERROR: ' + err
    })
})

router.put('/post/:id', async ctx => {

  let post = await Post.findOne({
    where: {
      id: ctx.params.id
    }
  })

  if (!post.dataValues.header) {
     ctx.body = {
      error: 'Bad Data!'
    }
  } else {
    await Post.update({
      header: post.dataValues.header,
    },
      {
        where: {
          id: ctx.params.id
        }
      }
    )
      .then(() => {
        ctx.body = { status: 'Post Update' }
      })
      .catch(err => {
        ctx.body = 'error: ' + err
      })
  }
})

//система рейтинга
router.put('/post/rating/:id', async ctx => {
  let r = await ctx.request.body.rating;
  r++
  await Post.update(
    { rating: r },
    { where: { id: ctx.params.id } }
  )
    .then(() => {
      console.log('res')
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

//показ комментов
router.get('/post/comments/:id', async ctx => {
  let pi = ctx.params.id
  await comments.findAll({where: {postId: pi}})
    .then(comments => {      
      if (comments) {
        ctx.body = comments
      } else {
        ctx.body = 'No comments'
      }
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

//отправка коммента
router.post('/post/comment/:id', async ctx => {
  if(ctx.request.body.text == '') {
    console.log('NO')
  } else
  await comments.create(ctx.request.body)
    .then(data => {
        ctx.body = data
        console.log(data.dataValues)
    })
    .catch(err => {
        ctx.body = 'ERROR: ' + err
    })
})

//система просмотров
router.put('/post/views/:id', async ctx => {
  let vv = await ctx.request.body.views
  console.log(vv, 'до инкременации')
  vv++
  console.log(vv, 'после инкременации')
  await Post.update(
    { views: vv },
    { where: { id: ctx.params.id } }
  )
    .then(() => {
      console.log('back')
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
})

module.exports = router