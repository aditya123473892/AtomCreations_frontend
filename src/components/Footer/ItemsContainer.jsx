import Item from "./Item";
import { SHOP, POLICIES, MORE } from "./FooterMenu";
import SocialIcons from "./SocialIcons";
import { Icons } from "./FooterMenu";

const ItemsContainer = () => {
  return (
    <div className="grid uppercase grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-24 px-5 py-16">
      <Item Links={POLICIES} title="POLICIES" />
      <Item Links={MORE} title="MORE" />
      <div>
        <h1 className="text-center sm:text-justify lg:text-justify font-semibold mb-4 cursor-pointer leading-6">
          Follow Us
        </h1>
        <SocialIcons Icons={Icons} />
      </div>
    </div>
  );
};

export default ItemsContainer;
