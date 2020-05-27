import React from 'react'
import firebase from 'firebase'
import Hitokoto from './Home/Hitokoto'
import Project from './Home/Project'
import CreateBtn from './Home/CreateBtn'
import ProjectNav from './Home/ProjectNav'

function Home() {
  return (
    <div className="home-container component-layout">
      <Hitokoto />
      <ProjectNav />
      <Project />
      <CreateBtn />
    </div>
  )
}

export default Home
