import { filterPokemon } from "./data.js";
import {filterGenerationPokemon} from "./data.js";
import data from "./data/pokemon/pokemon.js";
import {dataPokemonSort} from "./data.js";

//Declaración variable global
export const dataPokemon = data.pokemon;

//Contenedor principal en el HTML
let rootDiv = document.getElementById("root");

const paintData = (data) => {
  let pokemonsInformation = "";
  data.forEach((elemento) => {

    /*  Declaramos la variable  typeImg para guardar los iconos del tipo de Pokemon despues de recorrer el array con forEach y lo utilizamos para mostrarlo en la etiqueta img*/
    let typeImg = elemento.type.map((type)=>{
      return `<img class = "imgTypePoke" src ="./data/Img/icons/${type}.webp"/>`
    }).join("")

    /* Declaramos la variable  resistantPokemon para guardar los iconos de resistencia de Pokemon despues de recorrer el array con forEach y lo utilizamos para mostrarlo en la etiqueta img */
    let resistantPokemon = elemento.resistant.map((resist) =>{
     return `<img class="imgresisPoke" src="./data/Img/icons/${resist}.webp"/>`
    }).join("")

    let weaknessesPokemon = elemento.weaknesses.map((weak) => {
      return `<img class="imgweakPoke" src="./data/Img/icons/${weak}.webp"/>`
    }).join("")

    /* El div madre contiene toda la tarjeta - El div  containerDataCard contiene la información de la parte de adelante de la tarjeta VS containerDataCardReverse que contiene la parte de atras*/
    let boxPokemon = `
    <div class= "madre">
      <div class="containerDataCard">
        <img class="pokemonImg" src="${elemento.img}"/>
        <h3 class="namePokemon">${elemento.name}</h3>
        <h4 class="numPokemon">${elemento.num}</h4>

        <table class="tableSize">
        <tr class="sizeTittle">
          <th>Heigth</th>
          <th>Weight</th>
        </tr>
        <tr class="sizeNum">
        <td>${elemento.size.height}</td>
        <td>${elemento.size.weight}</td>
        </tr>
        </table>

        <h3 class="typePokemonName">Type</h3>
        <div class="containerTypeImg"> 
         ${typeImg}
        </div>
        
      </div>
      <div class="containerDataCardReverse">
      <img class="pokemonImgReverse" src="${elemento.img}"/>
      <h3 class=tittleResist >Resistant</h3> 
      <div class="containerResistantImg"> 
        ${resistantPokemon}
      </div>
      <h3 class= tittleWeak >Weaknesses</h3> 
      <div class="containerWeakImg"> 
        ${weaknessesPokemon}
      </div>
      <table class= "tablePokemonStats">
      <tr>
      <th>Attack</th>
      <th>Defense</th>
      <th>Stamina</th>
      <th>CP</th>
      <th>HP</th>
      </tr>
      <tr>
      <td>${elemento.stats['base-attack']}</td>
      <td>${elemento.stats['base-defense']}</td>
      <td>${elemento.stats['base-stamina']}</td>
      <td>${elemento.stats['max-cp']}</td>
      <td>${elemento.stats['max-hp']}</td>
      </tr>
      </table>
      </div>
    </div>
    `;
    pokemonsInformation += boxPokemon;
    
  });
  rootDiv.innerHTML = pokemonsInformation;
};
// invocar la función 
paintData(dataPokemon);


let divSelectType = document.getElementById("filtersType");
// se crea el select para las opciones de filtrado tipo de pokemon//
let selectOptionsTypePokemon = `
<div class = typePokeSelect>
  <select id="selectTypePokemon">
    <option value="" selected>Type</option>
    <option value="bug">Bug</option>
    <option value="dark">Dark</option>
    <option value="dragon">Dragon</option>
    <option value="electric">Electric</option>
    <option value="fairy">Fairy</option>
    <option value="fighting">Fighting</option>
    <option value="fire">Fire</option>
    <option value="flying">Flying</option>
    <option value="ghost">Ghost</option>
    <option value="grass">Grass</option>
    <option value="ground">Ground</option>
    <option value="ice">Ice</option>
    <option value="normal">Normal</option>
    <option value="poison">Poison</option>
    <option value="psychic">Psychic</option>
    <option value="rock">Rock</option>
    <option value="steel">Steel</option>
    <option value="water">Water</option>
  </select>
</div>
`
divSelectType.innerHTML = selectOptionsTypePokemon; 

let divSortPokemon= document.getElementById("sortName");
let buttonSortPoke=`
<select id="selectAzPokemon">
  <option value="allPokemones" >Order</option>
  <option value="sortButton" id="buttonSort">A-Z</option>
  <option value="sortButtonReverse">Z-A</option>
  </select>
`;

divSortPokemon.innerHTML=buttonSortPoke;

document.getElementById("selectAzPokemon").addEventListener("change",()=>{
  let selectOptionSort=document.getElementById("selectAzPokemon").value;
    if(selectOptionSort=="allPokemones"){
    paintData(dataPokemonSort(dataPokemon, "num"));
  }else if(selectOptionSort=="sortButton"){
    paintData(dataPokemonSort(dataPokemon, "name"));
  }else{
    paintData(dataPokemonSort(dataPokemon, "name").reverse());
  }
    
  });
//se crea un evento para seleccionar el pokemon que queremos filtrar por tipo //

document.getElementById("selectTypePokemon").addEventListener("change",() => {
// se crea la variable para guardar la selección del usuario (filtro tipo)//
  let selectOptions= document.getElementById("selectTypePokemon").value;
// se crea la condicional de: si no se selecciona ninguna opción va a mostrar todos los pokemones//
  if(!selectOptions){
    paintData(dataPokemon);
  }  else{
    paintData(filterPokemon(dataPokemon, selectOptions));
  }
});

// se crea el select para las opciones de filtro generación pokémon//
let divSelectGeneration = document.getElementById("filtersGeneration")
let selectOptionsGenerationPoke= `
<div>
  <select id="selectGenerationPokemon">
    <option value="" selected>Gen</option>
    <option value="kanto">Kanto</option>
    <option value="johto">Johto</option>
  </select>
</div>
`
divSelectGeneration.innerHTML= selectOptionsGenerationPoke;




//se crea un evento para seleccionar el pokemon que queremos filtrar por generación  //

document.getElementById("selectGenerationPokemon").addEventListener("change",()=>{
  let selectOptionGeneration = document.getElementById("selectGenerationPokemon").value;
  if(!selectOptionGeneration){
    paintData(dataPokemon)
  } else{
    paintData(filterGenerationPokemon(dataPokemon, selectOptionGeneration));
  }
});



// Click a botón que lleva a página 2
document.getElementById("buttonOne").addEventListener("click", () => {
  document.getElementById("firtsPage1").style.display = "none";
  document.getElementById("secondPage2").style.display = "block";
});

// Click a botón que retorna a home
document.getElementById("buttonhome").addEventListener("click", () => {
  document.getElementById("secondPage2").style.display = "none";
  document.getElementById("firtsPage1").style.display = "block";
});

