from django.shortcuts import render, redirect
from . models import Posts
from . forms import PostsForm

def index(request):
    posts = Posts.objects.all()[:10]
    context = {
        'title': 'Latest Posts',
        'posts': posts
    }
    return render(request, 'read/index.html', context)

def details(request, id):
  post = Posts.objects.get(id=id)
  context = {
    'post': post
  }

  return render(request, 'read/details.html', context)

def success(request):
  posts = Posts.objects.all()[:10]
  context={
    'posts':posts,
    'msg': 'Post saved successfully!',
    'type' : 'success'
  }
  return render(request, 'read/index.html',context)


def destroy(request, id):
  post = Posts.objects.get(id=id)
  if post.author == 'Saheb Giri':
    posts = Posts.objects.all()[:10]
    context={
      'posts':posts,
      'msg': 'Post cannot be deleted!',
      'type' : 'error'
    }
    return render(request, 'read/index.html',context)
  else:
    post.delete()
    posts = Posts.objects.all()[:10]
    context={
      'posts':posts,
      'msg': 'Post deleted successfully!',
      'type' : 'success'
    }
  return render(request, 'read/index.html',context)
  
def add(request):
    if request.method == "POST":
        form = PostsForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect("success")
            except:
                pass
    else:
        form = PostsForm()
    
    return render(request, 'read/add.html', {'form': form})
