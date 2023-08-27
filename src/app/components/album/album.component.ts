import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoviesModel } from 'src/app/models/movie.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  isUpdate: boolean = false;

  formMovie: FormGroup = new FormGroup({});

  listMovies: MoviesModel[] = []

  constructor(private albumService: AlbumService) {
    this.formMovie = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      description: new FormControl(''),
      time: new FormControl(''),
      image: new FormControl(''),
      status: new FormControl(true),
    });

    this.list();
  }

  list() {
    this.albumService.getMovies().subscribe(res => {
      if (res.success) {
        this.listMovies = res.data;
      }
    });
  }

  newMovie() {
    this.formMovie.reset();
    this.isUpdate = false;
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formMovie.controls['id'].setValue(item.id);
    this.formMovie.controls['name'].setValue(item.name);
    this.formMovie.controls['description'].setValue(item.description);
    this.formMovie.controls['time'].setValue(item.time);
    this.formMovie.controls['image'].setValue(item.image);
  }

  save() {
    this.formMovie.controls['status'].setValue(true);
    this.albumService.saveMovie(this.formMovie.value).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }

  update() {
    this.formMovie.controls['status'].setValue(true);
    this.albumService.updateMovie(this.formMovie.value).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }

  delete(id: number) {
    this.albumService.deleteMovie(id).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }

}
