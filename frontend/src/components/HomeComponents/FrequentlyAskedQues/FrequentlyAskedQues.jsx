import css from './FrequentlyAskedQues.module.css';
import CollapsableCard2 from '../../../utils/Cards/CollapsableCard2/CollapsableCard2'

let FrequentlyAskedQues = () => {
    return <div className={css.outerDiv}>
        <div className={css.innerDiv}>
            <div className={css.title}>Frequently asked questions</div>
            <div className={css.cards}>
                <CollapsableCard2 title="How will you register your restaurant in our platform?" content="To register your restaurant, Street Tadka, simply visit our website or download our app, fill out the registration form with your restaurant's details, and submit. Our team will review your submission, and once approved, your restaurant will be listed on our platform for customers to discover and order from." />
                <CollapsableCard2 title="What are the benefits of joining us?" content="Joining Street Tadka offers restaurants increased visibility and access to a wide customer base, boosting sales and revenue. Additionally, our platform provides convenient ordering options for customers, enhancing their dining experience and fostering repeat business." />
                <CollapsableCard2 title="Is Street Tadka can match the standards of Zomato or Swiggy?" content="While Street Tadka may not have the same scale as Zomato or Swiggy, we are dedicated to providing high-quality service and delicious Indian street food experiences. Our focus is on delivering authentic flavors, personalized customer service, and building strong relationships with both our partner restaurants and customers. We strive to exceed expectations and create memorable dining experiences, distinguishing ourselves in the market." />
                <CollapsableCard2 title="What are the foods available on Street Tadka?" content="Street Tadka offers a diverse range of authentic Indian street food delicacies, including flavorful chaats, sizzling kebabs, aromatic curries, crispy dosas, indulgent desserts, and refreshing beverages. Our menu showcases the rich and vibrant culinary traditions of India, ensuring there's something delicious for everyone to enjoy." />
            </div>
        </div>
    </div>
}

export default FrequentlyAskedQues;