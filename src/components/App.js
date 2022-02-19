import { Component } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Api from 'services/api';

import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import s from './App.module.css';

class App extends Component {
  state = {
    name: '',
    page: 1,
    arrayImage: [],
    status: 'idle',
    error: '',
    showModal: false,
    bigImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.name;
    const nextName = this.state.name;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1, arrayImage: [] });
    }
    if (prevPage !== nextPage) {
      this.fetchSearchMovies(nextName, nextPage);
    }
    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleSubmit = name => {
    this.setState({ name, page: 1, status: 'pending' });
    this.fetchSearchMovies(name, this.state.page);
  };

  handleLoadButton = () => {
    console.log(this);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchSearchMovies(nextName, nextPage) {
    Api.fetchSearchMovies(nextName, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            prevState,
            arrayImage: [...prevState.arrayImage, ...data.hits],
            status: 'resolved',
            imageSearch: nextName,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { arrayImage, bigImage, showModal, status, error } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>{error}</div>;
    }

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleSubmit} />;
    }

    if (status === 'resolved') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery
            arrayImage={arrayImage}
            toggleModal={largeImageURL => this.toggleModal(largeImageURL)}
          />
          {arrayImage.length !== 0 && (
            <Button onClick={this.handleLoadButton} />
          )}

          {showModal && (
            <Modal
              onClick={() => {
                this.toggleModal();
              }}
              image={bigImage}
            />
          )}
        </div>
      );
    }
  }
}

export default App;
