export default function LinksCreateHtmlForm() {
	return<>
		<form className={"flex flex-col"} action="/api/links" method="POST">
			<input className={'p-4 text-black'} type="text" name="url" placeholder="your url" defaultValue="https://github.com/cindywu/teeny-tiny"/>
			<button className={'p-4'} type="submit">make url teeny tiny</button>
		</form>
	</>
}