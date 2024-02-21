import React from "react";
import Logo from "@components/logo";
import "@styles/preference.scss";
const CreatePreference = () => {
  return (
    <div>
      <section className="prefer-container">
        <header>
          <Logo />
        </header>
        <section className="preference">
          <form className="form-prefer">
            <h1>Peferences</h1>
            <section className="pick-food">
              <h2>What's your favorite type of food?</h2>
              <h3>Dietary Preference</h3>
              <section className="main-topic">
                <section className="option">
                  <input type="checkbox" name="vegetarian" id="vegetarian" />
                  <label htmlFor="vegetarian">Vegetrian</label>
                </section>
                <section className="option">
                  <input
                    type="checkbox"
                    name="non-vegetarian"
                    id="non-vegetarian"
                  />
                  <label htmlFor="non-vegetarian">Non Vegetrian</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="vegan" id="vegan" />
                  <label htmlFor="vegan">Vegan</label>
                </section>
              </section>

              <h3>Meal Type</h3>
              <section className="main-topic">
                <section className="option">
                  <input type="checkbox" name="breakfast" id="breakfast" />
                  <label htmlFor="breakfast">Breakfast</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="lunch" id="lunch" />
                  <label htmlFor="lunch">Lunch</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="dinner" id="dinner" />
                  <label htmlFor="dinner">Dinner</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="dessert" id="dessert" />
                  <label htmlFor="dessert">Dessert</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="appetizers" id="appetizers" />
                  <label htmlFor="appetizers">Appetizers</label>
                </section>
              </section>

              <h3>Cooking Method</h3>
              <section className="main-topic">
                <section className="option">
                  <input type="checkbox" name="steaming" id="steaming" />
                  <label htmlFor="steaming">Steaming</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="grilling" id="grilling" />
                  <label htmlFor="grilling">Grilling</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="baking" id="baking" />
                  <label htmlFor="baking">Baking</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="stir-fry" id="stir-fry" />
                  <label htmlFor="stri-fry">Stir-Frying</label>
                </section>
              </section>

              <h3>Ingredient Preferences</h3>
              <section className="main-topic">
                <section className="option">
                  <input type="checkbox" name="chicken" id="chicken" />
                  <label htmlFor="chicken">Chicken</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="pork" id="pork" />
                  <label htmlFor="pork">Pork</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="seafood" id="seafood" />
                  <label htmlFor="seafood">Seafood</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="vegetables" id="vegetables" />
                  <label htmlFor="vegetables">Vegetables</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="rice" id="rice" />
                  <label htmlFor="rice">Rice</label>
                </section>
                <section className="option">
                  <input type="checkbox" name="pasta" id="pasta" />
                  <label htmlFor="pasta">Pasta</label>
                </section>
              </section>
            </section>
          </form>
        </section>
      </section>
    </div>
  );
};

export default CreatePreference;
