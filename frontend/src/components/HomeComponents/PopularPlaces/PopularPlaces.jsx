import { useState } from 'react';

import PlacesCard from '../../../utils/Cards/card3/PlacesCard'
import ShowMore from '../../../utils/Cards/card3/ShowMore'

import css from './PopularPlaces.module.css';

let PopularPlaces = () => {
    let [showMore, setShowMore] = useState();
    return <div className={css.outerDiv}>
        <div className={css.title}><span className={css.titleTxt}>Popular localities in and around</span> <span className={css.bld}>Gujarat</span></div>
        <div className={css.placesCards}>
            <PlacesCard place="Mehsana" count="3" link='/Mehsana' />
            <PlacesCard place="Ahmedabad" count="5" link='/Ahmedabad' />
            <PlacesCard place="Kalol" count="4" link='/Kalol' />
            <PlacesCard place="Surat" count="5" link='/Surat' />
            <PlacesCard place="Rajkot" count="4" link='/Rajkot' />
            <ShowMore setShowMore={setShowMore} />
        </div>
    </div>
}

export default PopularPlaces;