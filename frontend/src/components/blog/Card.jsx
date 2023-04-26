import React, { useContext } from 'react'
import './blog.css'
import { blog } from '../../assets/data/data'
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
function formatDate(dateString) {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Yangon',
    hour12: false,
  }
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}
export const Card = () => {
  const {
    userInfo: { data },
  } = useContext(UserContext)

  return (
    <>
      <section className="blog">
        <div className="container grid3">
          {data?.map((item) => {
            const desc = item.content.slice(0, 180) + '[...]'
            return (
              <div className="box boxItems" key={item._id}>
                <div className="img">
                  <Link to={`/details/${item._id}`} className="link">
                    <img
                      src={`http://localhost:4000/${item.thumbnail}`}
                      alt="images"
                    />
                  </Link>
                </div>
                <div className="details">
                  <div className="tag">
                    <AiOutlineTags className="icon" />
                    <a href="/">#{item.genre}</a>
                  </div>
                  <Link to={`/details/${item._id}`} className="link">
                    <h3>{item.title}</h3>
                  </Link>
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: desc,
                    }}
                  ></p>

                  <div className="date">
                    <AiOutlineClockCircle className="icon" />
                    <label htmlFor="">{formatDate(item.createdAt)}</label>
                    <AiOutlineComment className="icon" />
                    <label htmlFor="">27</label>
                    <AiOutlineShareAlt className="icon" />
                    <label htmlFor="">SHARE</label>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
