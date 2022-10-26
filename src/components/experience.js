import React from 'react'
import Progress_bar from './progress'

const Experience = () => {
  return (
    <div>
        <div className='exp'>
            <div className='columns'>
                <h3>Programming Language</h3>
                <div>
                    <h5>HTML/CSS</h5>
                    <Progress_bar bgcolor="orange" progress='75'  height={22} />
                </div>
                <div>
                    <h5>Javascript</h5>
                    <Progress_bar bgcolor="orange" progress='70'  height={22} />
                </div>
                <div>
                    <h5>Python</h5>
                    <Progress_bar bgcolor="orange" progress='30'  height={22} />
                </div>
                <div>
                    <h5>C/C++</h5>
                    <Progress_bar bgcolor="orange" progress='60'  height={22} />
                </div>
            </div>
            <div className='columns'>
                <h3>Framework/Library</h3>
                <div>
                    <h5>React</h5>
                    <Progress_bar bgcolor="orange" progress='75'  height={22} />
                </div>
                <div>
                    <h5>Next</h5>
                    <Progress_bar bgcolor="orange" progress='60'  height={22} />
                </div>
            </div>
            <div className='columns'>
                <h3>Language</h3>
                <div>
                    <h5>English</h5>
                    <Progress_bar bgcolor="orange" progress='75'  height={22} />
                </div>
                <div>
                    <h5>Nepali</h5>
                    <Progress_bar bgcolor="orange" progress='95'  height={22} />
                </div>
                <div>
                    <h5>Hindi</h5>
                    <Progress_bar bgcolor="orange" progress='60'  height={22} />
                </div>
                <div>
                    <h5>Sanskrit</h5>
                    <Progress_bar bgcolor="orange" progress='10'  height={22} />
                </div>
            </div>
        </div>
        <div className='projects'>
            <h3>Projects & Activities</h3>
            <div>
                <h5>Find my projects here: <a href='https://www.github.com/bipin1050' target='_blank'>github.com/bipin1050</a></h5>
            </div>
            <div>
                <h5>Worked as </h5>
                <ul>
                    <li><h5>Program Coordinator at SXC Physics Club, St. Xavier College, Maitighar</h5></li>
                    <li><h5>Event Manager at <a href='https://locus.com.np' target='_blank'>LOCUS 2023, IOE Pulchowk</a></h5></li>

                </ul>
                
            </div>
        </div>
    </div>
  )
}

export default Experience