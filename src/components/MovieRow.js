import React, {useState} from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);

        if (x > 0) {
            x = 0
        }

        setScrollX(x);
    }
    
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;

        if ((window.innerWidth - listW) > x) {
            /* -60 são os paddings dos dois lados da listagem */
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : 'https://i.pinimg.com/originals/c6/db/20/c6db20f5d83495f9b752dcf7cce5dfc0.gif'}  alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}