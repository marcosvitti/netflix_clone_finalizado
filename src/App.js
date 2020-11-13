import React, {useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

export default () => {
	const [movieList, setMovieList] = useState([]);
	const [featureData, setFeatureData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false)

	useEffect(() => {
		const loadAll = async () => {
			/* Pegando a lista TOTAL */
			let list = await Tmdb.getHomeList();
			setMovieList(list);

			/* Pegando o filme destaque */
			let originals = list.filter(i => i.slug === 'originals');
			let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
			let chosen = originals[0].items.results[randomChosen];
			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

			setFeatureData(chosenInfo);
		}

		loadAll();
	  }, []);

	useEffect(() => {
		const scrollListener = () => {
			if(window.scrollY > 30) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		}

		window.addEventListener('scroll', scrollListener);

		return () => {
			window.removeEventListener('scroll', scrollListener);
		}
	}, []);

	return(
		<div className="page">
			{/*HEADER*/}
			<Header black={blackHeader}/>
			{/*FILME DESTAQUE*/}
			{featureData &&
				<FeatureMovie item={featureData} />
			}
			{/*LISTA DOS FILMES*/}
			<section className="lists">
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>
			{/*FOOTER*/}
			<footer>
				Feito com <span role="img" aria-label="Coração"> ♥ </span> por Marcos Menghini Vitti
				Direitos de imagem para Netflix
			</footer>

			{movieList.length <= 0 &&
				<div className="loading">
					<img src="https://media1.tenor.com/images/1fe36998add400322db6aae8612d3fcf/tenor.gif?itemid=15122473" alt="Carregando"/>
				</div>
			}
		</div>
	);
}