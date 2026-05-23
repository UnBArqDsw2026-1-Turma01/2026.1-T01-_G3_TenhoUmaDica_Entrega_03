//para testar use npx ts-node teste-facade.ts
import { ForumFacade } from './forum.facade';
import { ComentariosService } from '../comentarios/comentarios.service';
import { PostsService } from '../posts/posts.service';
import { UsuariosService } from '../usuarios/usuarios.service';

console.log('=== FÓRUM FACADE: ORQUESTRANDO O SISTEMA (USANDO A CLASSE REAL) ===\n');

const comentariosService = new ComentariosService();
const postsService = new PostsService(comentariosService);
const usuariosService = new UsuariosService();
const facade = new ForumFacade(comentariosService, postsService, usuariosService);

console.log('1. Chamando exibirTopicosComPosts():');
console.log(facade.exibirTopicosComPosts());

console.log('\n2. Chamando exibirPostsComComentarios() -> Puxando a árvore do Composite:');

const pai = comentariosService.adicionarComentario('post-999', 'Esse post me salvou!', 'user-1');
comentariosService.adicionarResposta('post-999', pai.getId(), 'Digo o mesmo!', 'user-2');

const postCompleto = facade.exibirPostsComComentarios('post-999');
console.log(JSON.stringify(postCompleto, null, 2));

console.log('\n3. Chamando listarProfessoresDisciplina():');
console.log(facade.listarProfessoresDisciplina('ads-101'));