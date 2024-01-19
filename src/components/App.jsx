import { useState, useEffect } from "react";
import { getImage } from 'api/cards';
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

export const App = () => {
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardElement, setCardElement] = useState({});


useEffect(()=> {
  const fetchCards  = async () => {
    try {
      setLoading(true);
      const { data: {hits}, } = await getImage(search, page);
      setCards(prevCards => hits?.length ? [...prevCards, ...hits] : prevCards);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

 if(search) {
  fetchCards();
}
  }, [search, page]);


  const handleSearch = ({search}) => {
  setSearch(search);
    setCards([]);
    setPage(1);
  }
  
  
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
  
  const showModal =({largeImageURL}) => {
    setModalOpen(true);
      setCardElement({
        largeImageURL,
      })
  }
  
  const closeModal =() => {
    setModalOpen(false);
      setCardElement({});
  }
  
  
      const isCards = Boolean(cards.length);
      return (
      <>
        <Searchbar onSubmit={handleSearch}/>
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {isCards && <ImageGallery>
          <ImageGalleryItem showModal={showModal} items={cards}/>
          </ImageGallery>}
       {isCards && <Button onClick={loadMore} type="button">Load more</Button>}
        {modalOpen && <Modal close={closeModal}><img src={cardElement.largeImageURL} alt="" /></Modal>}
      </>
    )};
  

// async componentDidUpdate(prevProps, prevState) {
//   const {search, page} = this.state;
// if (search && (search !== prevState.search || page !== prevState.page)) {
// this.fetchCards();
// }
// }

// async fetchCards () {
//   const {search, page} = this.state;
//   try {
//     this.setState({
//       loading: true,
//     });
//     const { data: {hits}, } = await getImage(search, page);
//     this.setState(({cards}) => ({
//       cards: hits?.length ? [...cards, ...hits] : cards,
//     }));
//   } catch (error) {
//     this.setState({
//       error: error.message,
//     });
//   } finally {
//     this.setState({
//       loading: false,
//     });
//   }
// }

// handleSearch = ({search}) => {
// this.setState({
//   search,
//   cards: [],
// page: 1,
// })
// }

// loadMore = () => {
//   this.setState(({page}) => ({page: page + 1}));
// }

// showModal =({largeImageURL}) => {
//   this.setState({
//     modalOpen: true,
//     cardElement: {
//       largeImageURL,
//     }
//   })
// }

// closeModal =() => {
//   this.setState({
//     modalOpen: false,
//     cardElement: {}
//   })
// }

//   render() {
//     const {handleSearch, loadMore, showModal, closeModal} = this;
//     const {cards, loading, modalOpen, cardElement} = this.state;
//     const isCards = Boolean(cards.length);
//     return (
//     <>
//       <Searchbar onSubmit={handleSearch}/>
      
//       {loading && <Loader />}
//       {isCards && <ImageGallery>
//         <ImageGalleryItem showModal={showModal} items={cards}/>
//         </ImageGallery>}
//      {isCards && <Button onClick={loadMore} type="button">Load more</Button>}
//       {modalOpen && <Modal close={closeModal}><img src={cardElement.largeImageURL} alt="" /></Modal>}
//     </>
//   )};
// };
