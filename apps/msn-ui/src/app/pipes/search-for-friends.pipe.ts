import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchForFriendsPipe implements PipeTransform {

  transform(users: any[], searchTerm: string): any[] {
    if (!users) return [];
    if (!searchTerm) return users;

    searchTerm = searchTerm.toLowerCase();

    return users.filter(user => {
      return user.userName.toLowerCase().includes(searchTerm);
    });
  }

}
