<template>
	<main>
		<div v-if="topicsStore.activeTopic">
			<header>
				<h2>
					<input class="editable" v-model="topicsStore.activeTopic.title" />
				</h2>
				<div>
					<Button
						variation="destructive"
						@click="removeTopic(topicsStore.activeTopic.id)"
						>Odstrániť tému</Button
					>
				</div>
			</header>
			<section>
				<div class="add-note">
					<textarea
						v-model="newNote"
						placeholder="Nová poznámka..."
						@keypress.enter.prevent="addNote"
					></textarea>
					<Button @click="addNote">Pridať poznámku</Button>
				</div>
				<template v-if="!!topicsStore.activeTopic.notes.length">
					<div class="note-info">
						Počet označených poznámok:
						{{
							topicsStore.activeTopic.notes.reduce(
								(total, note) => total + (note.isComplete ? 1 : 0),
								0
							)
						}}
						/ {{ topicsStore.activeTopic.notes.length }}
					</div>
					<div v-auto-animate>
						<Note
							v-for="note in topicsStore.activeTopic.notes"
							:key="note.id"
							:note="note"
						/>
					</div>
				</template>
				<div v-else>Nie sú tu žiadne poznámky.</div>
			</section>
		</div>
		<div v-else class="overlay">Vyberte tému</div>
	</main>
</template>

<script setup>
import { ref } from 'vue'
import useTopicsStore from '@/store/topics'
import Note from '@/components/Note.vue'
import Button from '@/components/Buttons/Button.vue'

const topicsStore = useTopicsStore()

const newNote = ref('')

const removeTopic = (id) => topicsStore.removeTopic(id)

const addNote = () => {
	if (!!!newNote.value) {
		return
	}
	topicsStore.addNoteToTopic(topicsStore.activeTopic.id, newNote.value)
	newNote.value = ''
}
</script>

<style scoped>
main {
	padding: 1.5rem;
	width: 80%;
	position: relative;
}

header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.editable {
	font-size: inherit;
	color: inherit;
	font-weight: inherit;
}

.overlay {
	display: grid;
	place-items: center;
	position: absolute;
	inset: 0;
}

.note-info {
	margin-block: 0.75rem;
}

.add-note {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.add-note-button {
	align-self: flex-end;
	background-color: var(--primary-color);
	color: white;
	padding: 4px 8px;
	font-size: 0.9rem;
}

.remove-note-button {
	align-self: flex-end;
	background-color: crimson;
	color: white;
	padding: 4px 8px;
	font-size: 0.9rem;
}

textarea {
	color: white;
	border: 1px solid grey;
	padding: 0.5rem;
	width: 100%;
}

textarea:focus {
	border-color: white;
}
</style>
