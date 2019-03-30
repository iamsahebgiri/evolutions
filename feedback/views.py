from django.shortcuts import render,redirect
from . forms import FeedbacksForm
# Create your views here.
def index(request):
    if request.method == "POST":
        form = FeedbacksForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect("../")
            except:
                pass
    else:
        form = FeedbacksForm()
    
    return render(request, 'feedback/index.html', {'form': form})
