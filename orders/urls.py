from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_orders),
    path('create/', views.create_order),
    path('my/orders', views.my_orders),
    path('deliver/<int:pk>', views.delivered),
    path('detail/<int:pk>', views.solo_order),
    path('search/', views.searchOrder),
]
