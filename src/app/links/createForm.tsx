'use client'

export default function LinksCreateForm() {
	return<>
		<form className={"flex flex-col"}>
			<input className={'p-4 text-black'} type="text" name="url" placeholder="your url" value="https://github.com/cindywu/teeny-tiny"/>
			<button className={'p-4'} type="submit">make url teeny tiny</button>
		</form>
	</>
}