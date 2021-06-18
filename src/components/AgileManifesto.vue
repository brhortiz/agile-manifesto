<template>
  <v-container>
		<v-col>
			<p class="d-flex justify-center text-h1">Agile Manifesto</p>
			<v-divider></v-divider>
			<v-col class="my-4">
				<p class="text-h5">4 Values of Agile</p>
				<v-row
					ref="valuesList"
					class="flex-column"
				>
					<div
						v-for="(value, i) in values"
						:key="i"
					>
						<Values
							v-model="values[i]"
							:fieldObj="values[i]"
							@add-value="addValue"
							@delete-value="deleteValue"
						/>
					</div>
				</v-row>
				<v-row>
					<v-btn
						v-if="values.length < 4"
						:disabled="addValueBtnDisabled"
						block
						color="grey"
						outlined
						@click="addNewValue"
					>
						<v-icon left color="green darken-2">
							mdi-plus
						</v-icon>
						Add Value
					</v-btn>
				</v-row>
			</v-col>
			<v-col>
				<p class="text-h5">12 Principles of Agile</p>
				<v-row
					ref="principlesList"
					class="flex-column"
				>
					<div
						v-for="(principle, i) in principles"
						:key="i"
					>
						<Principles
							v-model="principles[i]"
							:fieldObj="principles[i]"
							@add-principle="addPrinciple"
							@delete-principle="deletePrinciple"
						/>
					</div>
				</v-row>
				<v-row>
					<v-btn
						v-if="principles.length < 12"
						:disabled="addPrincipleBtnDisabled"
						block
						color="grey"
						outlined
						@click="addNewPrinciple"
					>
						<v-icon left color="green darken-2">
							mdi-plus
						</v-icon>
						Add Principle
					</v-btn>
				</v-row>
			</v-col>
		</v-col>
  </v-container>
</template>

<script>
import axios from 'axios';
import Values from './ValuesTextFields'
import Principles from './PrinciplesTextFields'

export default {
	name: 'AgileManifesto',
	components: {
		Values,
		Principles
	},
	data: () => ({
		values: [],
		principles: [],
		addValueBtnDisabled: false,
		addPrincipleBtnDisabled: false,
	}),
	mounted: function() {
		this.fetchValues()
		this.fetchPrinciples()
	},
	methods: {
		fetchValues: function() {
			const apiUrl = process.env.API_URL
			axios({
				method: 'get',
				url: `${apiUrl}values`,
			})
				.then((response) => {
					this.values = response.data
				});
		},
		fetchPrinciples: function() {
			const apiUrl = process.env.API_URL
			axios({
				method: 'get',
				url: `${apiUrl}principles`,
			})
				.then((response) => {
					this.principles = response.data
				});
		},
		addValue: function(data) {
			this.values.pop()
			this.values.push(data)
			this.addValueBtnDisabled = false
		},
		addPrinciple: function(data) {
			this.principles.pop()
			this.principles.push(data)
			this.addPrincipleBtnDisabled = false
		},
		deleteValue: function(fieldid) {
			this.values = this.values.filter(value => value.id !== fieldid)
		},
		deletePrinciple: function(fieldid) {
			this.principles = this.principles.filter(value => value.id !== fieldid)
		},
		addNewValue: function() {
			this.values.push({ field_value: '', id: 0 })
			this.addValueBtnDisabled = true
		},
		addNewPrinciple: function() {
			this.principles.push({ field_value: '', id: 0 })
			this.addPrincipleBtnDisabled = true
		}
	}
}
</script>