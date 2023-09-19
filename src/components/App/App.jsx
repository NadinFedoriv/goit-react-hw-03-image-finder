import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader/Loader';
import './App.scss';
import { fetchImages } from 'services';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    isLoading: false,
    noMoreImages: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then(data => {
        const lastPage = Math.ceil(data.totalHits / 12);

        if (data.totalHits === 0) {
          this.setState({ noMoreImages: true });
          return toast.info(`No results found for ${query}`);
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            noMoreImages: false,
          }));
        }
        if (page === lastPage) {
          this.setState({ noMoreImages: true });
          return toast.success(
            `You have uploaded all images for request ${query}`
          );
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        toast.error(`No results found for ${query}`);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, showModal, noMoreImages, largeImageURL } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          images={images}
          handleImageClick={this.handleImageClick}
        />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && !noMoreImages && (
          <Button onClick={this.onLoadMore} isVisible={true} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
