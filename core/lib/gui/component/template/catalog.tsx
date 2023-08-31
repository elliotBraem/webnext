export const CatalogTemplate = ({ ...props }) => {
	const collectionsMock = [
		{
			type: "collection",
			name: "Foxes",
			icon: { metadata: { type: "react.element" }, data: <span un-i="openmoji-fox" /> },
		},
	]

	return (
		<div flex="col" w="full" h="full" {...props}>
			<div flex="~" gap="4" p="4" w="full" h="full">
				<aside flex="col">
					<ul w="full" h="full" p="0" m="0" list="none">
						{collectionsMock.map(({ name, icon }) => (
							<li flex="~" gap="2">
								{icon.metadata.type === "react.element" ? (
									icon.data
								) : (
									<span un-i="openmoji-magnifying-glass-tilted-right" />
								)}
								<span>{name}</span>
							</li>
						))}
					</ul>
				</aside>

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
