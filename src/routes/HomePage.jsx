import '../assets/css/styles.css'
import img from '../assets/img/PostItHomePage.png'
export default function Homepage() {
  return (
    <div id='homePage'>
      <div className='border'>
        <span className="vertical-border-right"></span>
        <span className="vertical-border-left"></span>
        <span className="horizontal-border-top"></span>
        <span className="horizontal-border-bottom"></span>
      </div>
      <div className='postIt'>
      <h1 className='title'>Notes App</h1>
      <img src={img} alt="PostIt" className='postItImg'/>
      </div>

    </div>
  );
}