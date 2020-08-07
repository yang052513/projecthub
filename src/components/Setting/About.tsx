import React from 'react'

export const About: React.FC = () => {
  return (
    <div>
      <div className="setting-content-intro">
        <h2>About Projecthub</h2>
        <div className="setting-content-about-container">
          <p>
            I started this project since April 2020, and the intention of the
            app is just to help me manage all my projects. I love building
            things after learning some technology, and I always believe learn by
            doing is the best approach to master the learning process. Thus, I
            decide to make a project dashboard managerment that I could manage
            projects with different status, like in progress, planning,
            completed..etc. The idea I got from Douban which is a book journey
            website, and people could categorize the books they read, and the
            books they want to buy etc.
          </p>

          <p>
            Later, I figured out that I want to have some analysis about my
            project activity, such as what are the most tools that I used in the
            last month? How many projects that I completed and gave up within a
            month? So I want to use chart to visiualize my past activities. The
            project I completed in one month, but I dont want to just end here.
            Therefore, I designed more features into the app like the team pair,
            friend system, custom setting, explore projects, and story share.
            It's the longest project that I ever created, but it's really fun.
          </p>

          <p>
            What I learned is that planning is really important, and way more
            important than the coding stage. Since I am doing everything for
            myself, I need to determine the taskflow, design mockups, and
            functionality testing. I didnt count how much time I spent on
            designing layout as I am not good on UI/UX. I also refixed my
            database structure couple times because I didnt except to make a
            fully functional website at first. I heard Storybook almost when I
            finished my project, and it's really a good tool to document
            component.
          </p>

          <p>
            I know there are tons of similar app out there, and I dont even
            think mine is comparable to them. However, I do believe what I
            learned during the process is valueable, and the experience and
            mistakes that I could make a better one next time.
          </p>

          <p>Thank you.</p>

          <p>Yang Li</p>
        </div>
      </div>
    </div>
  )
}

export default About
