import React, { useContext } from "react";

import CollectionPreview from "../collection-preview/collection-preview.component";

import CollectionContext from "../../contexts/collections/collections.context";

const CollectionsOverview = () => {
  const collections = useContext(CollectionContext);
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview
          key={id}
          {...otherCollectionProps}
        ></CollectionPreview>
      ))}
    </div>
  );
};

export default CollectionsOverview;
