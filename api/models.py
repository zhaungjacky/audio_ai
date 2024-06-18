from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class PrimeUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    prime = models.BooleanField(default=False)
    plus = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    svip = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  
    def __str__(self):
        return f"{self.user}"
    
    def save(self,*args,**kawrgs):
        super().save(*args,**kawrgs)

# when a user created automatically create a primeuser with default settings
@receiver(post_save, sender=User)
def create_prime_user(sender, instance, created, **kwargs):
    if created:
        PrimeUser.objects.create(user=instance)

# Connect the signal
post_save.connect(create_prime_user, sender=User)

class StyleTypes(models.Model):
    title = models.CharField(max_length=100, blank=False, default="")
    context = models.TextField(max_length=1000, blank=True, default="")
    icon = models.TextField(max_length=100, blank=True, default="")
    importString = models.CharField(max_length=100, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"   

class NotesData(models.Model):
    title = models.CharField(max_length=1000, blank=False, default="title")
    ori = models.TextField(
        max_length=100000, blank=False, default="defalute ori notes"
    )
    trans_res = models.TextField(
        max_length=100000, blank=False, default="defalute transcript notes"
    )
    tag_0 = models.CharField(max_length=100, blank=True)
    tag_1 = models.CharField(max_length=100, blank=True)
    tag_2 = models.CharField(max_length=100, blank=True)
    tag_3 = models.CharField(max_length=100, blank=True)
    tag_4 = models.CharField(max_length=100, blank=True)
    tag_5 = models.CharField(max_length=100, blank=True)
    tag_6 = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    userStatus = models.ForeignKey(
        PrimeUser, on_delete=models.CASCADE, blank=False, default=1
    )
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=True
    )
    file_name = models.CharField(max_length=100, blank=True) #use to record url path

    def __str__(self):  
        return f'{self.title,self.userStatus,self.tag_0}'


class MainpageHtmlContent(models.Model):
    title = models.CharField(max_length=200, blank=False, default="述而作")
    top_0 = models.CharField(max_length=200, blank=False, default="述而作=倾听之耳+生花妙笔+无限可能")
    top_1 = models.CharField(
        max_length=200,
        blank=False,
        default="您说我写，“述而作”可以帮您把聊天、谈话、会议、课程、口述其至呢喃快速转化为清晰可使用可发布的文字",
    )
    top_2 = models.CharField(
        max_length=200, blank=False, default="助力您极速撰写文章、邮件、博客、报告、作文、说明、议论等"
    )
    top_3 = models.CharField(max_length=200, blank=False, default="-")
    top_4 = models.CharField(max_length=200, blank=False, default="-")
    top_5 = models.CharField(max_length=200, blank=False, default="-")
    mid_0 = models.CharField(max_length=200, blank=False, default="应用场景")
    mid_1 = models.CharField(max_length=200, blank=False, default="常见问题")
    mid_2 = models.CharField(max_length=200, blank=False, default="-")
    mid_3 = models.CharField(max_length=200, blank=False, default="-")
    mid_4 = models.CharField(max_length=200, blank=False, default="-")
    mid_5 = models.CharField(max_length=200, blank=False, default="-")
    bottom_0 = models.CharField(max_length=200, blank=False, default="易谙科技")
    bottom_1 = models.CharField(max_length=200, blank=False, default="述而作")
    bottom_2 = models.CharField(max_length=200, blank=False, default="faqs")
    bottom_3 = models.CharField(max_length=200, blank=False, default="隐私策略")
    bottom_4 = models.CharField(max_length=200, blank=False, default="工作流程")
    bottom_5 = models.CharField(max_length=200, blank=False, default="-")
    bottom_6 = models.CharField(max_length=200, blank=False, default="-")
    bottom_7 = models.CharField(max_length=200, blank=False, default="-")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"


class PrimeHtmlContent(models.Model):

    title = models.CharField(max_length=100, blank=False, default="")
    context = models.TextField(max_length=1000, blank=True, default="")
    annalPrice = models.IntegerField(blank=True, default=0)
    imagesPath = models.CharField(max_length=200, blank=True, default="")
    cssStyles = models.CharField(max_length=300, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"


class IflyPostInfo(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, primary_key=True
    )
    ts = models.CharField(max_length=200, blank=False, null=False)
    signa = models.CharField(max_length=200, blank=False, null=False)
    orderId = models.CharField(max_length=200, blank=False, null=False)
    appId = models.CharField(max_length=200, blank=False, null=False)
    resultType = models.CharField(max_length=200, blank=False, null=False)
    url = models.CharField(max_length=500, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=False, default=1)

    def __str__(self):
        return f"{self.orderId,self.user}"


class UserCases(models.Model):
    title = models.CharField(max_length=100, blank=False, default="title")
    context = models.TextField(max_length=1000, blank=True, default="context")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return f"{self.title}"


class Faqs(models.Model):

    title = models.CharField(max_length=100, blank=False, default="title")
    context = models.TextField(max_length=1000, blank=True, default="context")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return f"{self.title}"


class WorkProcess(models.Model):
    title = models.CharField(max_length=100, blank=False, default="title")
    context = models.TextField(max_length=1000, blank=True, default="context")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # id = models.UUIDField(default=uuid.uuid4,unique=True,editable=False,primary_key=True)

    def __str__(self):
        return f"{self.title}"
