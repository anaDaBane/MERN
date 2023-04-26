import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiImageAddLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsBagCheck } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrHelp } from 'react-icons/gr'
import { BiLogOut } from 'react-icons/bi'
import { UserContext } from '../../UserContext'
export const User = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const user = userInfo.user
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }
  async function logoutControl() {
    const response = await fetch('http://localhost:4000/api/v1/user/logout', {
      method: 'POST',
      credentials: 'include',
    })
    if (response.ok) {
      setUserInfo({ ...userInfo, user: false, email: '' })
    }
  }
  return (
    <>
      <div className="profile">
        {user ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/233e27167488061.642a30bfd6295.jpg"
                alt="images"
              />
            </button>
            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <Link to="/account">
                  <div className="image">
                    <div className="img">
                      <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/233e27167488061.642a30bfd6295.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="text">
                      <h4>Phyo Wai Lin</h4>
                      <p>Nyaung U ,Bagan</p>
                    </div>
                  </div>
                </Link>
                <Link to="/create">
                  <button className="box">
                    <RiImageAddLine className="icon" />
                    <h4>Create Post</h4>
                  </button>
                </Link>

                <button className="box">
                  <IoSettingsOutline className="icon" />
                  <h4>My Account</h4>
                </button>
                <button className="box">
                  <BsBagCheck className="icon" />
                  <h4>My Order</h4>
                </button>
                <button className="box">
                  <AiOutlineHeart className="icon" />
                  <h4>Wishlist</h4>
                </button>
                <button className="box">
                  <GrHelp className="icon" />
                  <h4>Help</h4>
                </button>
                <button className="box" onClick={logoutControl}>
                  <BiLogOut className="icon" />
                  <h4>Log out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login">
            <button>My Account</button>
          </Link>
        )}
      </div>
    </>
  )
}
