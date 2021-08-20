// sort select HTML creation
export default class SortButton {

	render() {
		return `
		<div class="sort">
			<label for="order by" class="sort__label">Trier par</label>
			<select name="Order by" id="tri" class="button button--select" data-trigger="select">
				<option value="popularité">Popularité</option>
				<option value="date">Date</option>
				<option value="titre">Titre</option>
			</select>
		</div>`;
	}
}