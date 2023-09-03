import { useState, useEffect } from 'preact/hooks';
import { getAllThings } from '../service';

export const CatalogTemplate = ({ ...props }) => {
	const [things, setThings] = useState({});

  // Fetch things when the component mounts
  useEffect(() => {
		loadData();
  }, []);

	function loadData() {
		getAllThings({ accounts: ["efiz.near", "carina.akaia.near"], type: "**" }).then((fetchedThings) => {
      setThings(fetchedThings);
    });
	};
	
	return (
		<div flex="col" w="full" h="full" {...props}>
			<div flex="~" gap="4" p="4" w="full" h="full">
				<aside flex="col">
					<ul w="full" h="full" p="0" m="0" list="none">
						<RecursiveElement data={things} />
					</ul>
				</aside>
				<button onClick={loadData}>Load data</button>
				<section flex="~">
					{[
						{
							type: "image",
							name: "Dixie in the house",

							previewSrc:
								"https://ipfs.near.social/ipfs/bafkreibaz5jflynarfsxuka7kkme7sujmpz73rbzyqtnlb2elycssvjwgu",
						},
						{
							type: "image",
							name: "Christmas Finnegan",

							previewSrc:
								"https://ipfs.near.social/ipfs/bafkreidlqtqcdm74fyfzmzd4saxqgennuuinkxn3b5gu4wajjhn34mxiju",
						},
					].map(({ name, previewSrc }) => (
						<a href="/#" un-decoration="none">
							<figure>
								<img alt={`${name}'s avatar`} src={previewSrc} />
								<figcaption>{name}</figcaption>
							</figure>
						</a>
					))}
				</section>
			</div>
		</div>
	)
}

const RecursiveElement = ({ data, level = 0 }) => {
  const [expandedKeys, setExpandedKeys] = useState({});

  const toggleExpand = (key) => {
    setExpandedKeys({
      ...expandedKeys,
      [key]: !expandedKeys[key],
    });
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      {Object.keys(data).map((key, index) => (
        <div key={index}>
          {typeof data[key] === 'object' ? (
            <>
              <span onClick={() => toggleExpand(key)} style={{ cursor: 'pointer' }}>
                {expandedKeys[key] ? '[-]' : '[+]'} {key}
              </span>
              {expandedKeys[key] && <RecursiveElement data={data[key]} level={level + 1} />}
            </>
          ) : (
            <span>
              {key}: {data[key]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};